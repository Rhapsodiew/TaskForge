import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTask } from './entities/usertask.entity';
import { Repository } from 'typeorm';
import { CreateUserTaskDto } from './dto/createUser_tasks.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class UsertasksService {
    constructor (@InjectRepository(UserTask) 
    private usertasksRepository: Repository<UserTask>,
    ) {}

    async findAll() {
        return await this.usertasksRepository.find()
    }

    // async getTest(id:number) {
    //         const test = await this.usertasksRepository.fin
    // }

    async findOne(id: number) {
        return await this.usertasksRepository.findOne({ where: { id }});
    }

    async findTasksByUser(id: number) {
        console.log('id',id);
        const tasks = await this.usertasksRepository.find({
            where: {
                user: {id}}
            ,
            relations: ['user','task']
        });
        console.log(tasks);
        return tasks
    }

    async create(createTaskDto: CreateUserTaskDto) {
        const task = this.usertasksRepository.create(createTaskDto);
        return await this.usertasksRepository.save(task);
    }
    
    async updateTask(id: number, updateTasksDto: UserTask) {
        const toUpdate = await this.usertasksRepository.findOne({ where: {id}});
        const updated = Object.assign(toUpdate, updateTasksDto);
        return await this.usertasksRepository.save(updated);
    }

    // async updateTaskStatus(id: number, status_id: number) {
    //     task = await this.tasksService.findOne(id);

    // }

    async remove(id: number) {
        const task = await this.findOne(id);
        if (task) {
            return await this.usertasksRepository.remove(task);
        }
    }
}
