import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";


export class CreateUserTaskDto{
    user: User;
    task: Task;
}