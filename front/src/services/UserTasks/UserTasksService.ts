import { ICreateUserTask, IUserTasks } from "@/app/shared/interfaces"
import  api  from "../api"


// USERTASKS
export const getAllUserTasks = async () => {
    // console.log("usertask ",await api.get('/usertasks').then((response) => response.data))
    return await api.get('/usertasks').then((response) => response.data)
}

export const getUserTasksById = async (user_id: number) => {
    const userTask = await api.get('/usertasks/all/' + user_id).then((response) => response.data)
    return userTask
}

export const createUserTasks = async (user: number, task: number) => {
    return await api.post('/usertasks/create',
        {
            user: user,
            task: task
        }) 
       
}