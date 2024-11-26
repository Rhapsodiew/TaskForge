import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {}


    async create(createUserDto: CreateUserDto) {
        return await this.usersRepo.save(createUserDto);
    }
    // create(createUser: Users): Users {
    //     createUser.user_id = this.idCounter++;
    //     this.users.push(createUser);
    //     return createUser;
    // }
    // create(createUsersDto: CreateUsersDto) {
    //     return 'This action adds a new user';
    // }
    
    async findAll() {
        return await this.usersRepo.find();
    }
    // findAll(): Users[] {
    //     return this.users;
    // }


    async findOneById(id: number): Promise<User> {
        return await this.usersRepo.findOne({ where: { id } });
    }
    // findOne(user_id: number): Users {
    //     return this.users.find(user => user.user_id === user_id);
    // }

    async findOneByUsername(username: string): Promise<User> {
        // console.log("username",username);
        return await this.usersRepo.findOne({ where: { username } });
    }

   

    async update(id: number, updatedUser: CreateUserDto) {
        const toUpdate = await this.usersRepo.findOne({ where: {id}});
        const updated = Object.assign(toUpdate, updatedUser);
        return await this.usersRepo.save(updated);
    }
    // update(user_id: number, updatedUser: Users): Users {
    //     const user = this.findOne(user_id);
    //     if (user) {
    //         Object.assign(user, updatedUser);
    //     }
    //     return user;
    // }

    async remove(id: number) {
        const user = await this.findOneById(id);
        if (user) {
            return await this.usersRepo.remove(user);
        }
    }
    // remove(user_id: number): void {
    //     const index = this.users.findIndex(user => user.user_id === user_id);
    //     if (index !== -1) {
    //         this.users.splice(index, 1);
    //     }
    // }
}
