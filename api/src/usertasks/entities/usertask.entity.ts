import { IsNotEmpty } from "class-validator";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class UserTask{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP' })
    assigned_at: Date;

    // @Column()
    // @IsNotEmpty()
    // user_id : number;

    // @Column()
    // @IsNotEmpty()
    // task_id : number;

    @ManyToOne(() => User, (user) => user.id, { onDelete:'CASCADE', eager: true })
    @JoinColumn({ name: 'user_id', referencedColumnName:'id'})
    @IsNotEmpty()
    user: User;

    @ManyToOne(() => Task, (task) => task.id, {eager: true})
    @JoinColumn({ name: 'task_id', referencedColumnName:'id'})
    @IsNotEmpty()
    task: Task;

    constructor (id: number, user_id: number, task_id:  number,user: User, task: Task){
        this.id = id;
        // this.user_id = user_id;
        // this.task_id = task_id;
        this.task = task;
        this.user = user;
        this.assigned_at = new Date();
    }
}