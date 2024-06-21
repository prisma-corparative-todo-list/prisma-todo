import { Controller, Post, Body, UseGuards, Res, Get } from '@nestjs/common';
import { Prisma, User } from 'prisma/prisma-client';
import { SigninDto, SignupDto } from './dto';
import { AuthService } from './auth.service';
import { SignupGuard } from './guards/signup.guard';
import { SigninGuard } from './guards/signin.guard';
import { UserService } from 'user';
import { TokenService } from './helpers/token.service';
import { PasswordService } from './helpers/password.service';
import * as bcrypt from 'bcrypt';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { CurrentUser } from 'user/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseGuards(SigninGuard)
  @Post('signin')
  public async signin(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res
  ): Promise<User> {

    const user = await this.userService.findOne({
      AND:[{ email:body.login }, { userName:body.login }],
    });
    

    const tokens = await this.tokenService.generateTokens(user.email, user.id);

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return user;
  }

  @UseGuards(SignupGuard)
  @Post('signup')
  public async signup(
    @Body() body: SignupDto,
    @Res({ passthrough: true }) res
  ): Promise<User> {
    const user = await this.authService.signup(body);

    const tokens = await this.tokenService.generateTokens(user.email, user.id);

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return user;
  }


  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  public async refresh(@CurrentUser() { email,id:userId }: User,@Res() res) : Promise<void>{
    const tokens = await this.tokenService.generateTokens(email, userId);
    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

  }
}
