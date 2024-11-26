import { Module } from '@nestjs/common';
import { UsertasksService } from './usertasks.service';
import { UsertasksController } from './usertasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from './entities/usertask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTask])],
  providers: [UsertasksService],
  controllers: [UsertasksController],
  exports: [UsertasksService]
})
export class UsertasksModule {}
