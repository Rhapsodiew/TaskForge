import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task } from './entities/task.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Status } from 'src/status/entities/status.entity';
import { UpdateTaskStatusDto } from './dto/updateTaskStatus.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    // @Public()
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    printtask() {
        return this.tasksService.findAll();
    }

    // @Public()
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: string ){
        return this.tasksService.findOne(+id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get('status/:status')
    findTaskByStatus(@Param('status') status: number ){
        return this.tasksService.findTaskByStatus(status);
    }
    
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get('due_date/:due_date')
    findTaskByDueDate(@Param('due_date') due_date: Date ){
        return this.tasksService.findTaskByDueDate(due_date);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get('priority/:priority')
    findTaskByPriority(@Param('priority') priority: string ){
        return this.tasksService.findTaskByPriority(priority);
    }
    
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post('create')
    create(@Body() createTasksDto: CreateTaskDto) {
        return this.tasksService.create(createTasksDto);
    }


    
    // @Public()
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Put(':id')
    updateTask(@Param('id') id: string, @Body() updateTasksDto: CreateTaskDto) {
        return this.tasksService.updateTask(+id, updateTasksDto);
    }

    @Roles(Role.ADMIN,Role.USER)
    @UseGuards(RolesGuard)
    @Put('status/:id')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
        return this.tasksService.updateTaskStatus(+id, updateTaskStatusDto);
    }


    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.remove(+id);
    }
}
