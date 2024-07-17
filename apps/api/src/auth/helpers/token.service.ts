import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ITokens } from '../../../../../interfaces';

@Injectable()
export class TokenService {
  private logger = new Logger(TokenService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  public async generateTokens(email: string, userId: string): Promise<ITokens> {
    const refreshToken = this.jwtService.sign(email, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });

    const accessToken = this.jwtService.sign(email, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });

    await this.saveToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async saveToken(userId: string, token: string): Promise<boolean> {
    const refreshToken = await this.prismaService.refreshToken.create({
      data: {
        userId,
        token,
      },
    });

    if (!refreshToken) return false;

    return true;
  }

  public async removeToken(userId: string): Promise<void> {
    const token = await this.prismaService.refreshToken.deleteMany({
      where: {
        userId,
      },
    });

    if (!token) {
      throw new UnauthorizedException('не авторизован!');
    }
  }

  public async verifyToken(token: string): Promise<string | null> {
    try {

      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });
      
      return payload 
    }catch(e){
      return null
    }

  }

  public async decodeToken(token: string): Promise<string> {
    return await this.jwtService.decode(token);
  }

}
