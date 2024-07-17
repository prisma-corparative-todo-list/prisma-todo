import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'user';
import { SigninDto } from '../dto';
import { PasswordService } from '../helpers/password.service';

@Injectable()
export class SigninGuard implements CanActivate {


  constructor(
    private readonly userService:UserService,
    private readonly passwordService:PasswordService
  ){}

  private logger = new Logger(SigninGuard.name)

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean>  {
    
    const {
      body: { login,password },
    }: { body: SigninDto } = context.switchToHttp().getRequest()

  
    const user = await this.userService.findOne({
      OR:[{ email: login },{ userName: login }]
    })

    if(!user){
      throw new UnauthorizedException("User doesn't exist!")
    }

    const isPasswordCorrect = await this.passwordService.comparePassword(password,user.hashPass)
    
    if(!isPasswordCorrect){
      throw new UnauthorizedException('Invalid password!');
    }

    this.logger.log(user)

    return isPasswordCorrect
    
  }
}
