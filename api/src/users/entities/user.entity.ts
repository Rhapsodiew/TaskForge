import { IsEmail, IsNotEmpty } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserTask } from "src/usertasks/entities/usertask.entity";
import { Role } from "src/auth/enums/role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
      unique: true,
    })
    @IsNotEmpty()
    username: string;
    
    @Column({ 
      unique: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    // @BeforeInsert()
    // async hashPassword() {
    //   const salt = await bcrypt.genSalt();
    //   this.password = await bcrypt.hash(this.password, salt);
    // }
    @Column({
      type: 'enum',
      enum: Role,
      default: Role.USER
    })
    role: Role

    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP', // Set the default value to the current timestamp
    })
    created_at: Date;
    
    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    })
    updated_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
      this.updated_at = new Date();
    }
    
    @OneToMany(() => UserTask, (usertask) => usertask.user)
    usertasks: UserTask[]
  }