import { IsNotEmpty } from "class-validator";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Status{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    status_name: string;

    @OneToMany(() => Task, task => task.status)
    tasks: Task[]
}