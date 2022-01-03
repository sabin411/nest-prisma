import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
