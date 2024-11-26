import api from "../api";
import { ICreateTask } from "@/app/shared/interfaces";


// TASKS
export const getAllTasks = async () => {
    // console.log("tasks", await api.get('/tasks').then((response) => response.data))
    return await api.get('/tasks').then((response) => response.data)
    // .then((response) => {
    //     console.log(response.data);
    //     return response.data
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
}

export const getTaskById = async (id: number) => {
    console.log("task", await api.get('/tasks/' + id).then((response) => response.data))
    return await api.get("/tasks/" + id).then((response) => response.data);
    // .then((response) => {
    //     console.log(response.data);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
}

export const createTasks = async (task: ICreateTask) => {
    // console.log('task',task)
    return await api.post("/tasks/create", 
        {
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date,
            "priority": task.priority,
            status: task.status,
            project: task.project
        })
}

export const updateStatus = async (id: number, status: number) => {
    // console.log("task", await api.put('/tasks/' + id, {"status": status}))
    return await api.put("/tasks/status/" + id  , {status: status});
    // .then((response) => {
    //     console.log(response.data);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
}


