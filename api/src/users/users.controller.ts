import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    // @Public()
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get('id/:user_id')
    findOneById(@Param('user_id') user_id: string ){
        return this.usersService.findOneById(+user_id);
    }

    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(RolesGuard)
    @Get('myuser')
    findMyUser(@Req() req){
        (req.user.user_id)
        return this.usersService.findOneById(req.user.user_id);
    }

    // @Roles(Role.ADMIN)
    // @UseGuards(RolesGuard)
    // @Get('myusername')
    // findMyUsername(@Req() req){
    //     (req.user.username)
    //     return this.usersService.findOneByUsername(req.user.username);
    // }
    
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(RolesGuard)
    @Put('updatemyuser')
    updateMyUser(@Req() req, @Body() updatedUser: CreateUserDto) {
        return this.usersService.update(req.user.user_id, updatedUser);
    }

    // @Roles(Role.ADMIN)
    // @UseGuards(RolesGuard)
    @Public()
    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Put(':user_id')
    update(@Param('user_id') user_id: string, @Body() updateUserDto: CreateUserDto) {
        return this.usersService.update(+user_id, updateUserDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Delete(':user_id')
    remove(@Param('user_id') user_id: string) {
        return this.usersService.remove(+user_id);
    }
}
