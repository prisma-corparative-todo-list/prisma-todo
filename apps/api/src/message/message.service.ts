import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message, Prisma } from 'prisma/prisma-client';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(payload: CreateMessageDto): Promise<Message> {
    return await this.prisma.message.create({ data: payload });
  }

  async findMany(
    payload: Prisma.MessageWhereInput = {},
    { limit, page }: { limit: number; page: number }
  ): Promise<Message[]> {
    return await this.prisma.message.findMany({
      where: payload,
      include: { user: true },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(payload: Prisma.MessageWhereInput): Promise<Message> {
    return await this.prisma.message.findFirst({
      where: payload,
      include: { user: true },
    });
  }
}
