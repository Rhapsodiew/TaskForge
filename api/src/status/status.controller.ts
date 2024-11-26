import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/createStatus.dto';
import { Status } from './entities/status.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/role.enum';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    findAll() {
        return this.statusService.findAll();
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get(':status_id')
    findOne(@Param('status_id') status_id: string ){
        return this.statusService.findOne(+status_id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post('create')
    create(@Body() createStatusDto: CreateStatusDto) {
        return this.statusService.create(createStatusDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Put(':status_id')
    updateStatus(@Param('status_id') status_id: string, @Body() updateStatusDto: Status) {
        return this.statusService.updateStatus(+status_id, updateStatusDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Delete(':status_id')
    remove(@Param('status_id') status_id: string) {
        return this.statusService.remove(+status_id);
    }
}
