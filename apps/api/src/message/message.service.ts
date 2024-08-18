import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message, Prisma } from 'prisma/prisma-client';
import { CreateMessageDto } from './dto/create-message.dto';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IResponseMessageAndUser } from '../../../../interfaces';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger(MessageService.name);

  async createOne(payload: CreateMessageDto): Promise<Message> {
    return await this.prisma.message.create({ data: payload });
  }

  async findMany(
    payload: Prisma.MessageWhereInput = {},
    { limit, cursor }: { limit: number; cursor: number }
  ): Promise<IResponseMessageAndUser> {
    const messages = await this.prisma.message.findMany({
      where: payload,
      include: { user: true },
      skip: cursor,
      take: limit,
      orderBy: {
        createAt: 'desc',
      }
    });

    const nextCursor = messages.length
      ? cursor + limit
      : null;

    return {
      data: messages,
      nextCursor,
    };
  }

  async findOne(payload: Prisma.MessageWhereInput): Promise<Message> {
    return await this.prisma.message.findFirst({
      where: payload,
      include: { user: true },
    });
  }
}
