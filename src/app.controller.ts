import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('products')
  findPublishedProducts() {
    return this.prisma.product.findMany({
      where: { published: true },
    });
  }
}
