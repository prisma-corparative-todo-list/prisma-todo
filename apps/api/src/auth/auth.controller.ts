import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Get,
  Logger,
  HttpCode,
  HttpStatus,
  Param,
  Render,
} from '@nestjs/common';
import { User } from 'prisma/prisma-client';
import { SigninDto, SignupDto } from './dto';
import { AuthService } from './auth.service';
import { SignupGuard } from './guards/signup.guard';
import { SigninGuard } from './guards/signin.guard';
import { UserService } from 'user';
import { TokenService } from './helpers/token.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { CurrentUser } from 'user/decorators/current-user.decorator';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ITokensAndUser } from '../../../../interfaces';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  private readonly logger = new Logger(AuthController.name);

  @HttpCode(HttpStatus.OK)
  @UseGuards(SigninGuard)
  @Post('signin')
  public async signin(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res
  ): Promise<User> {
    const user = await this.userService.findOne({
      OR: [{ email: body.login }, { userName: body.login }],
    });

    const tokens = await this.tokenService.generateTokens(user.email, user.id);

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  }

  @UseGuards(SignupGuard)
  @Post('signup')
  public async signup(
    @Body() body: SignupDto,
    @Res({ passthrough: true }) res
  ): Promise<User> {
    const user = await this.authService.signup({ ...body });

    const tokens = await this.tokenService.generateTokens(user.email, user.id);

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  public async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res
  ): Promise<ITokensAndUser> {

    const tokens = await this.tokenService.generateTokens(user.email, user.id);

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      user,
    };
  }

  @Get('/activate/:link')
  @Render('index.ejs')
  public async activate(@Param('link') link: string) {
    const user = await this.userService.updateOne(
      { activationLink: link },
      { isActivated: true }
    );
    return {
      username: user.userName,
    };
  }
}
