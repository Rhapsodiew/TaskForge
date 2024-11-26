import { Project } from "src/projects/entities/project.entity";
import { Status } from "src/status/entities/status.entity";


export class CreateTaskDto{
    title: string;
    description?: string;
    priority: string;
    due_date: Date;
    project: Project;
    status: Status;
}