export interface IUserTasks {
    id: number,
    task: ITasks,
    user: IUser
}
export interface ITasks {
    id: number
    title: string,
    description: string,
    priority: string,
    due_date: string,
    project:IProject,
    status:IStatus
}
export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string,
    role: string
}

export type TUser = {
    id: number,
    username: string,
    email: string,
    password: string,
    role: string
}

export interface IProject {
    id: number,
    name: string,
    description: string
}
export interface IStatus {
    id: number,
    status_name: string
}

export interface ICreateTask {
    title:string,
    description: string,
    due_date: string,
    priority: string,
    status: number,
    project: number,
}

export interface ICreateUserTask {
    user: number,
    // task: number,
}

export interface IUserToModify {
    username: string,
    email: string,
    password: string
}
