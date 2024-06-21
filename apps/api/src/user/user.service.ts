import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'prisma/prisma-client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto';
import { SignupDto } from 'app/auth/dto';
import { randomUUID} from "node:crypto"

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){}

    async findOne(payload:Prisma.UserWhereInput): Promise<User | null> {
        return await this.prisma.user.findFirst({where:payload})
    }

    async createOne(data:CreateUserDto): Promise<User> {

        const activationLink = randomUUID()

        return await this.prisma.user.create({
            data:{
                ...data,
                activationLink,
            }
        })
    }

}
