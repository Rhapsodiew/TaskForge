'use client'
import CardNavigation from "@/components/Card-navigation"
import CardTask from "@/components/Card-task"
import { createUserTasks, getAllUserTasks, getUserTasksById } from "@/services/UserTasks/UserTasksService"
import { useEffect, useState } from "react"
import { ICreateTask, ICreateUserTask, IProject, ITasks, IUser, IUserTasks } from "../shared/interfaces"
import { getProfileUser } from "@/services/Auth/AuthService"
import { getAllUsers, getMyUser } from "@/services/User/UsersService"
import { getAllProject } from "@/services/Project/ProjectService"
import { createTasks, getAllTasks } from "@/services/Tasks/TasksService"
import { all } from "axios"


export default function Tasks() {

    const [dataAll, setDataAll] = useState<IUserTasks[] | null>(null)
    const [userData, setUserData] = useState<IUser>({id: 0, username: '', email: '', password: '', role: ''}); 
    const [taskData, setTaskData] = useState<IUserTasks[] | null>(null)
    const [project, setProject] = useState<IProject[]>([]);
    const [allUser, setAllUser] = useState<IUser[]>([]);
    const [allTask, setAllTask] = useState<ITasks[]>([]);


    const [createTask, setCreateTask] = useState<ICreateTask> ({
        title: '',
        description: '',
        due_date: '',
        priority: 'Low',
        status: 1,
        project: 1,
    })
    const [createUserTask, setCreateUserTask] = useState<ICreateUserTask> ({
        user: 1,
    })
    const handleChange = (data: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = data.target;
        if (name === 'user'){
            // console.log(name,value)
            // console.log(allUser[+value-1])
            setCreateUserTask(prevData => ({... prevData, [name]: allUser[+value-1].id}))
        } else if (name === 'project') {
            // console.log(name, value)
            // console.log(project[+value-1])
            setCreateTask(prevData => ({... prevData, [name]: project[+value-1].id}))
        } else {
            // console.log(createUserTask)
            setCreateTask(prevData => ({... prevData, [name]: value}))
        }
    }
    const handleSubmit = async (data: React.ChangeEvent<HTMLInputElement>) => {
        data.preventDefault();
        try {
        console.log('create task',createTask)
        createTasks(createTask);
        
        const a = allTask[allTask.length-1].id+1
        console.log('idtomodify', a)
        console.log(setCreateUserTask(prevData => ({... prevData, task: a})))
        console.log('create usertask',createUserTask)
        createUserTasks(createUserTask.user, a);
        // alert('Succes')
        } catch (err) {
            console.log(err)
        }

    }  

    useEffect(() => {        
        getProfileUser().then((data) => {
            let userData = getMyUser()    
            userData.then(function(result) {
                setUserData(result)
                //console.log('setDataAll', setDataAll((prev) => ({...prev, username: result.username})))
             })
            if (data.role === 'USER') {
                let userTaskData = getUserTasksById(data.user_id)
                userTaskData.then(function(result) {  
                // console.log('result', result);
                setTaskData(result)
            })
            } else if (data.role === 'ADMIN') {
                getAllUserTasks().then((data) => {
                    // console.log('AllUserTask',data);
                    setTaskData(data)
                })
                getAllProject().then((data) => {
                    // console.log('AllProject', data);
                    setProject(data)
                })
                getAllUsers().then((data) => {
                    // console.log('AllUser', data);
                    setAllUser(data)
                })
                getAllTasks().then((data) => {
                    console.log('AllTask', data);
                    setAllTask(data)
                })
            }
        })
    }, [createUserTask])


    return (
        <div>
            <h1 className="text-lg font-bold text-indigo-50 bg-indigo-950">Tasks</h1>
            <CardNavigation username={userData.username} />
            {userData.role === 'ADMIN' &&
            <div className="bg-indigo-700/50">
                <form className="grid grid-cols-7">
                    
                    <label className="flex font-bold justify-center">Title</label>
                    <label className="flex font-bold justify-center">Description</label>
                    <label className="flex font-bold justify-center">Due Date</label>
                    <label className="flex font-bold justify-center">Priority</label>
                    <label className="flex font-bold justify-center">Project</label>
                    <label className="flex font-bold justify-center">User</label>
                    <button onClick={handleSubmit} className="text-indigo-50 font-bold px-6 border border-indigo-900 hover:bg-indigo-800 mx-2 py-2 rounded-b-3xl bg-indigo-900">Add Task</button>
                
                    <input className="mx-2 my-1 px-2 rounded-md" type="text" name="title" placeholder="Title" required onChange={handleChange}value={createTask.title}/>
                    <input className="mx-2 my-1 px-2 rounded-md" type="text" name="description" placeholder="Description" onChange={handleChange}value={createTask.description}/>
                    <input className="mx-2 my-1 px-2 rounded-md" type="date" name="due_date" placeholder="Due Date" required onChange={handleChange}value={createTask.due_date}/>
                    <input className="mx-2 my-1 px-2 rounded-md" type="text" name="priority" placeholder="Priority" onChange={handleChange}value={createTask.priority}/>
                    <input className="mx-2 my-1 px-2 rounded-md" type="number" name="project" placeholder="Project" min={1} max={project?.length}  required onChange={handleChange} defaultValue={1}/>
                    <input className="mx-2 my-1 px-2 rounded-md" type="number" name="user" placeholder="User" min={1} max={allUser?.length}  required onChange={handleChange} defaultValue={1}/>
                </form>
            </div>
            }
            <div className="grid grid-cols-8">
                <p className="bg-indigo-100 px-8 border-b font-bold border-indigo-900/50 flex justify-center items-center">Index</p>
                <p className="bg-indigo-200 px-8 border-b font-bold border-indigo-900/50 flex justify-center items-center">Title</p>
                <p className="bg-indigo-100 px-8 border-b font-bold border-indigo-900/50 flex justify-center items-center">Description</p>
                <p className="bg-indigo-200 px-8 border-b font-bold border-indigo-900/50 flex justify-center items-center">Due Date</p>
                <p className="bg-indigo-100 px-8 border-b font-bold border-indigo-900/50 flex justify-center items-center">Priority</p>
                <p className="bg-indigo-200 px-8 border-b font-bold border-indigo-900/50 flex justify-center items-center">Project</p>
                <p className="bg-indigo-100 px-8 border-b font-bold border-indigo-900/50 flex justify-center items-center"> Status</p>
                <p className="bg-indigo-200 px-8 border-b font-bold border-indigo-900/50 flex justify-center items-center">User</p>
            </div>
            {taskData && taskData.map((usertask: IUserTasks, i: number) => {
                return(
                    <div key={usertask.id}>
                        <CardTask 
                        id={usertask.task.id}
                        index={i+1}
                        title={usertask.task.title} 
                        description={usertask.task.description} 
                        due_date={usertask.task.due_date}
                        priority={usertask.task.priority}
                        project_name={usertask.task.project.name}
                        status={usertask.task.status.status_name}
                        username={usertask.user.username}
                         />
                    </div>
                )
            })}
        </div>
    )
}