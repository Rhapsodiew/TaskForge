import { IsNotEmpty } from "class-validator";
import { stat } from "fs";
import { Project } from "src/projects/entities/project.entity";
import { Status } from "src/status/entities/status.entity";
import { UserTask } from "src/usertasks/entities/usertask.entity";
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { RelationIdMetadata } from "typeorm/metadata/RelationIdMetadata";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column({ nullable: true})
    description: string;

    @Column({ nullable: true, default: 'Low'})
    priority: string;

    @Column()
    @IsNotEmpty()
    due_date: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date();
    }

    // @Column()
    // @IsNotEmpty()
    // project_id: number;

    // @Column()
    // @IsNotEmpty()
    // status_id: number;

    @ManyToOne(() => Project, (project) => project.id, { onDelete: 'CASCADE',nullable:true, eager:true  })
    @JoinColumn({ name: 'project_id', referencedColumnName:'id'})
    @IsNotEmpty()
    project: Project;
  
    // @Column({name:'status_id'})
    // statusId: number;

    @ManyToOne(() => Status, (status) => status.id, {eager:true})
    @JoinColumn({ name: 'status_id', referencedColumnName:'id'})
    @IsNotEmpty()
    status: Status;
    // @RelationId((task: Task) => task.status)    
    // status_id: number

    @OneToMany(() => UserTask, usertask => usertask.task)
    usertask: UserTask[]

    constructor( title: string, description: string, priority: string, due_date: Date,project: Project,status: Status, project_id: number, status_id: number){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.due_date = due_date;
        // this.project_id = project_id;
        // this.status_id = status_id;
        this.project = project;
        this.status = status;
    }
       
      

}