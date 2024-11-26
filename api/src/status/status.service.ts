import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { CreateStatusDto } from './dto/createStatus.dto';

@Injectable()
export class StatusService {
    constructor(@InjectRepository(Status)
    private statusRepo: Repository<Status>,
    ) {}

    async findAll() {
        return await this.statusRepo.find();
    }

    async findOne(id: number) {
        return await this.statusRepo.findOne({ where: { id }});
    }

    async create(createStatusDto: CreateStatusDto) {
        return await this.statusRepo.save(createStatusDto);
    }

    async updateStatus(id: number, updateStatusDto: Status) {
        const toUpdate = await this.statusRepo.findOne({ where: {id}});
        const updated = Object.assign(toUpdate, updateStatusDto);
        return await this.statusRepo.save(updated);
    }

    async remove(id: number) {
        const status = await this.findOne(id);
        if (status) {
            return await this.statusRepo.remove(status);
        }
    }


}


