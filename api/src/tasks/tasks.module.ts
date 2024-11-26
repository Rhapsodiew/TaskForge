import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UsertasksModule } from 'src/usertasks/usertasks.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsertasksModule,
  ],
  providers: [TasksService,{provide: APP_GUARD, useClass: JwtAuthGuard,} ], //{provide: APP_GUARD, useClass: JwtAuthGuard,}
  controllers: [TasksController]
})
export class TasksModule {}
