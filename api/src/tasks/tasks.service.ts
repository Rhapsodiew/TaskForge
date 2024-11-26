import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { UsertasksService } from 'src/usertasks/usertasks.service';
import { AuthService } from 'src/auth/auth.service';
import { Status } from 'src/status/entities/status.entity';
import { stat } from 'fs';
import { UpdateTaskStatusDto } from './dto/updateTaskStatus.dto';

@Injectable()
export class TasksService {
    constructor (@InjectRepository(Task)
    private tasksRepo: Repository<Task>,
    private usertasksService: UsertasksService,   
) {}

    async findAll() {
        return await this.tasksRepo.find()
    }
    
    async findOne(id: number) {
        return await this.tasksRepo.findOne({ where: { id }});
    }

    async findTaskByStatus(id: number) {
        const tasks = await this.tasksRepo.find({
            where: {
                status: {id}}
            ,
            relations: ['status']
        });
        // console.log(tasks);
        return tasks    
    }

    async findTaskByDueDate(date: Date) {
        const tasks = await this.tasksRepo.find({
            where: {
                due_date: date}
        });
        // console.log(tasks);
        return tasks
    }

    async findTaskByPriority(priority: string) {
        const tasks = await this.tasksRepo.find({
            where: {
                priority: priority}
        });
        // console.log(tasks);
        return tasks
    }

    async create(createTaskDto: CreateTaskDto) {
        const task = this.tasksRepo.create(createTaskDto);
        return await this.tasksRepo.save(task);
    }

    async updateTask(id: number, updateTasksDto: CreateTaskDto) {
        const toUpdate = await this.tasksRepo.findOne({ where: {id}});
        const updated = Object.assign(toUpdate, updateTasksDto);
        return await this.tasksRepo.save(updated);
    }

    async updateTaskStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
        const toUpdate = await this.tasksRepo.findOne({ where: {id}});
        const updated = Object.assign(toUpdate, updateTaskStatusDto);
        return await this.tasksRepo.save(updated);
    }

    // async updateTaskStatus(id: number, status_id: UpdateTaskStatus) {

    //     const toUpdate = await this.tasksRepo.findOne({ where: {id}});
    //     toUpdate.status_id = status_id;
    //     return await this.tasksRepo.save(toUpdate);
    // }

    async remove(id: number) {
        const task = await this.findOne(id);
        if (task) {
            return await this.tasksRepo.remove(task);
        }
    }

}
