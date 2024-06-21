import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'user';
import { SigninDto, SignupDto } from '../dto';
import { PasswordService } from '../helpers/password.service';

@Injectable()
export class SigninGuard implements CanActivate {


  constructor(
    private readonly userService:UserService,
    private readonly passwordService:PasswordService
  ){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean>  {
    
    const {
      body: { login,password },
    }: { body: SigninDto } = context.switchToHttp().getRequest()

  
    const user = await this.userService.findOne({
      OR:[{email:login},{userName:login}]
    })

    if(!user){
      throw new UnauthorizedException("User doesn't exist!")
    }

    if(!user.isActivated){
      throw new UnauthorizedException("Please,check your email inbox for confirm your email!")
    }

    const isPasswordCorrect = await this.passwordService.comparePassword(password,user.hashPass)
    
    if(!isPasswordCorrect){
      throw new UnauthorizedException('Invalid password!');
    }

    return isPasswordCorrect
    
  }
}
