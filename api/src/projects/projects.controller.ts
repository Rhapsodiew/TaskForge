import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { Project } from './entities/project.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(+id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get(':id/tasks')
    getProjectTasks(@Param('id') id: string) {
        return this.projectsService.getProjectTasks(+id);
    }   

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post('create')
    createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.createProject(createProjectDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Put(':id')
    updateProject(@Param('id') id: string, @Body() updateProjectDto: Project) {
        return this.projectsService.updateProject(+id, updateProjectDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(+id);
    }
}
