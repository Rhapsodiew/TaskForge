import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService,], //{provide: APP_GUARD, useClass: JwtAuthGuard,} WHY IS THIS AUTO IMPLEMENTED ???
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
