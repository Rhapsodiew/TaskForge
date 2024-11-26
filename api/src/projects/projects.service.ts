import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';

@Injectable()
export class ProjectsService {
        constructor(@InjectRepository(Project)
        private projectRepo: Repository<Project>,
    ){}

    private project: Project[] = [];


    async createProject(createProjectDto: CreateProjectDto) {
        return await this.projectRepo.save(createProjectDto);
    }

    async findAll() {
        return await this.projectRepo.find();
    }

    async findOne(id: number) {
        return await this.projectRepo.findOne({ where: { id }});
    }

    async updateProject(id: number, updateProject: Project) {
        const toUpdate = await this.projectRepo.findOne({ where: {id}});
        const updated = Object.assign(toUpdate, updateProject);
        return await this.projectRepo.save(updated);
    }

    async remove(id: number) {
        const project = await this.findOne(id);
        if (project) {
            return await this.projectRepo.remove(project);
        }
    }

    async getProjectTasks(id: number) {
        const project = await this.projectRepo.findOne({ where: { id }, relations: ['task'] });
        if (!project) {
            throw new Error('Project not found');
        }
        return project.task;
    }

    // async addTaskToProject(projectId: number, taskId: number) {
    //     const project = await this.projectRepo.findOne({ where: { id: projectId }, relations: ['tasks'] });
    //     if (!project) {
    //         throw new Error('Project not found');
    //     }
    //     project.tasks = project.tasks || []; // Initialize tasks array if not exists
    //     project.tasks.push({ id: taskId } as any); // Assuming Task has an 'id' property
    //     return await this.projectRepo.save(project);
    // }

}
