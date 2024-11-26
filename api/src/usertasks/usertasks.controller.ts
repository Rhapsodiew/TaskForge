import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsertasksService } from './usertasks.service';
import { UserTask } from './entities/usertask.entity';
import { CreateUserTaskDto } from './dto/createUser_tasks.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('usertasks')
export class UsertasksController {
    constructor(private readonly usertasksService: UsertasksService) {}

    @Public()
    // @Roles(Role.ADMIN)
    // @UseGuards(RolesGuard)
    @Get()  
    findAll() {
        return this.usertasksService.findAll();
    }

    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get('all/:user_id')
    findTasksByUser(@Param('user_id') user_id: number) { //Req() req
        // console.log(req.user.user_id);
        return this.usertasksService.findTasksByUser(user_id); //req.user.user_id
    }
    // findOneById(@Param('user_id') user_id: string )

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post('create')
    create(@Body() createUserTaskDto: CreateUserTaskDto) {
        return this.usertasksService.create(createUserTaskDto);
    }

    @Public()
    // @Roles(Role.ADMIN)
    // @UseGuards(RolesGuard)
    @Put(':id')
    updateTask(@Param('id') id: string, @Body() updateUserTaskDto: UserTask) {
        return this.usertasksService.updateTask(+id, updateUserTaskDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usertasksService.remove(+id);
    }
}

