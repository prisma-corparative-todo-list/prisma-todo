import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const File = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
   return ctx.switchToHttp().getRequest().filename
  },
);