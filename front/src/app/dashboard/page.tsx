'use client'

import CardNavigation from "@/components/Card-navigation";
import { use, useEffect, useState } from "react";
import { IProject, IUser, IUserTasks } from "../shared/interfaces";
import { getProfileUser } from "@/services/Auth/AuthService";
import { getMyUser } from "@/services/User/UsersService";
import { getUserTasksById } from "@/services/UserTasks/UserTasksService";
import { Tooltip } from "@nextui-org/tooltip";

export default function DashBoard() {
    const [taskData, setTaskData] = useState<IUserTasks[] | null>(null)
    const [data, setData] = useState<IUser>({id: 0, username: '', email: '', password: '', role: ''}); 
    const [project, setProject] = useState<string[] | null>(null);

        useEffect(() => {
        getProfileUser().then((data) => {
            let userData = getMyUser()    
            userData.then(function(result) {
                setData(result)
             })
             let userTaskData = getUserTasksById(data.user_id)
             userTaskData.then(function(result) {  
                setTaskData(result)
             })
        })
    }, [])
    // console.log(taskData)

    

    const taskNotComplete = taskData?.filter((task) => task.task.status.status_name !== 'Complete')
    const taskComplete = taskData?.filter((task) => task.task.status.status_name === 'Complete')
    // console.log('NotComplete',taskNotComplete)
    // console.log('taskComplete', taskComplete)
    const now = new Date();
    // if (taskNotComplete) {
    //     taskNotComplete.forEach((task) => {
    //         const dueDate = new Date(task.task.due_date);
    //         if (dueDate < now) {
    //             console.log('Its OVER, NO TIME LEFT:', task.task.title);
    //         }
    //     });
    // }

    const addProject = (project_name: string) => {
        setProject(prev => {
            console.log('project:', project_name);

            // Si le tableau est vide, retourne un tableau avec le projet
            if (!prev) return [project_name];
            // Si le projet n'est pas déjà présent, ajoute-le
            if (!prev.includes(project_name)) {
                return [...prev, project_name];
            }
            // Sinon, retourne l'état inchangé
            return prev;
        });
        console.log('added:', project_name);
    }
    
    return (
        <div className="">
            <h1 className="text-lg font-bold text-indigo-50 bg-indigo-950">Dashboard</h1>
            <CardNavigation username={data.username} />
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-span">
                    <div className="bg-indigo-100 p-2 my-8 rounded-2xl">
                        <div className="flex justify-start font-bold text-lg">
                            <div>
                                <h2>Projet en cours</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <p className="flex justify-center">Nom</p>
                            <p className="flex justify-center">Description</p>
                        </div> 
                        <p className="border-t-2 border-indigo-200 p-1"></p>
                        <div>
                            {taskNotComplete?.map((usertask: IUserTasks, i: number) => {
                                return(
                                    <div key={usertask.id}>
                                        {
                                        new Date(usertask.task.due_date) < now ? null :
                                            // !project?.includes(usertask.task.project.name) && addProject(usertask.task.project.name)
                                            // project?.includes(usertask.task.project.name) ?
                                            // null
                                            // :
                                            // addProject(usertask.task.project.name)
                                            <div className="grid grid-cols-2">
                                                <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.project.name}</p>
                                                <div className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">
                                                    {/* {!project?.includes(usertask.task.project.name) && addProject(usertask.task.project.name)} */}
                                                    {/* {project && !project.includes(usertask.task.project.name) && addProject(usertask.task.project.name)} */}
                                                {usertask.task.project.description.length > 20 ?
                                                <Tooltip content={
                                                    <div>
                                                        <p className="text-small font-bold">Description</p>
                                                        <p className="text-tiny">{usertask.task.project.description}</p>
                                                    </div>
                                                    }
                                                    placement="top-end"
                                                    closeDelay={0}
                                                    className="w-96 rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                                                    <p className="">{usertask.task.project.description.substring(0, 20)}...</p>
                                                </Tooltip>
                                                :
                                                usertask.task.project.description
                                                }
                                                </div>
                                            </div>
                                            }
                          
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="row-span">
                    <div className="bg-indigo-100 p-2 my-8 rounded-2xl">
                        <div className="flex justify-start font-bold text-lg">
                            <div>
                                <h2>Tache à finir</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-4">
                            <p className="flex justify-center">Title</p>
                            <p className="flex justify-center">Priority</p>
                            <p className="flex justify-center">Status</p>
                            <p className="flex justify-center">Due Date</p>
                        </div> 
                        <p className="border-t-2 border-indigo-200 p-1"></p>
                        <div>
                            {taskNotComplete?.map((usertask: IUserTasks, i: number) => {
                                return(
                                    <div key={usertask.id} >
                                        {
                                            new Date(usertask.task.due_date) < now ?
                                            null
                                            :
                                            <div className="grid grid-cols-4">
                                            <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.title}</p>
                                            <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.priority}</p>
                                            <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.status.status_name}</p>
                                            <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.due_date.split('T')[0]}</p>
                                            </div>
                                        }
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>


                <div className="row-span">
                    <div className="bg-indigo-100 p-2 my-8 rounded-2xl">
                        <div className="flex justify-start font-bold text-lg">
                            <div>
                                <h2>Tache : Date passé</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <p className="flex justify-center">Title</p>
                            {/* <p className="flex justify-center">Priority</p> */}
                            {/* <p className="flex justify-center">Status</p> */}
                            {/* <p className="flex justify-center">Due Date</p> */}
                            <p className="flex justify-center">Description</p>
                        </div> 
                        <p className="border-t-2 border-indigo-200 p-1"></p>
                        <div>
                            {taskNotComplete?.map((usertask: IUserTasks, i: number) => {
                                return(
                                    <div key={usertask.id} >
                                        {
                                            new Date(usertask.task.due_date) > now ?
                                            null
                                            :
                                            <div className="grid grid-cols-2">
                                            <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.title}</p>
                                            {/* <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.priority}</p> */}
                                            <div className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">

                                            {usertask.task.description.length > 20 ?
                                                <Tooltip content={
                                                    <div>
                                                        <p className="text-small font-bold">Description</p>
                                                        <p className="text-tiny">{usertask.task.description}</p>
                                                    </div>
                                                    }
                                                    placement="top-end"
                                                    closeDelay={0}
                                                    className="w-96 rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                                                    <p>{usertask.task.description.substring(0, 20)}...</p>
                                                </Tooltip>
                                                :
                                                usertask.task.description
                                                }   
                                                </div>                                         {/* <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.due_date.split('T')[0]}</p> */}
                                            </div>              
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="row-span-3 row-start">
                <div className="bg-indigo-100 p-2 my-8 rounded-2xl">
                        <div className="flex justify-start font-bold text-lg">
                            <div>
                                <h2>Tache : Complete</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <p className="flex justify-center">Title</p>
                            {/* <p className="flex justify-center">Priority</p> */}
                            {/* <p className="flex justify-center">Status</p> */}
                            {/* <p className="flex justify-center">Due Date</p> */}
                            <p className="flex justify-center">Description</p>
                        </div> 
                        <p className="border-t-2 border-indigo-200 p-1"></p>
                        <div>
                            {taskComplete?.map((usertask: IUserTasks, i: number) => {
                                return(
                                    <div key={usertask.id} >
                                        {
                                            <div className="grid grid-cols-2">
                                            <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.title}</p>
                                            {/* <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.priority}</p> */}
                                            <div className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">

                                            {usertask.task.description.length > 20 ?
                                                <Tooltip content={
                                                    <div>
                                                        <p className="text-small font-bold">Description</p>
                                                        <p className="text-tiny">{usertask.task.description}</p>
                                                    </div>
                                                    }
                                                    placement="top-end"
                                                    closeDelay={0}
                                                    className="w-96 rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                                                    <p>{usertask.task.description.substring(0, 20)}...</p>
                                                </Tooltip>
                                                :
                                                usertask.task.description
                                                }   
                                                </div>                                         {/* <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.due_date.split('T')[0]}</p> */}
                                            </div>              
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>      
    )
}

// new Date(usertask.task.due_date) < now ?
                                            // null
                                            // :
                                             
                                            
                                            // <div className="grid grid-cols-2">
                                            //     <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.project.name}</p>
                                            //     <div className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{
                                            //     usertask.task.project.description.length > 20 ? 
                                            //     <Tooltip content={
                                            //         <div>
                                            //             <p className="text-small font-bold">Description</p>
                                            //             <p className="text-tiny">{usertask.task.project.description}</p>
                                            //         </div>
                                            //         } 
                                            //         placement="top-end" 
                                            //         closeDelay={0} 
                                            //         className="w-96 rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                                            //         <p className="">{usertask.task.project.description.substring(0, 20)}...</p>
                                            //     </Tooltip>
                                            //     :
                                            //     usertask.task.project.description
                                            //     }
                                            //     </div>
                                            // </div>

                          {/* <div className="grid grid-cols-2">
                                                        <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.project.name}</p>
                                                        <div className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">
                                                        {usertask.task.project.description.length > 20 ?
                                                        <Tooltip content={
                                                            <div>
                                                                <p className="text-small font-bold">Description</p>
                                                                <p className="text-tiny">{usertask.task.project.description}</p>
                                                            </div>
                                                            }
                                                            placement="top-end"
                                                            closeDelay={0}
                                                            className="w-96 rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                                                            <p className="">{usertask.task.project.description.substring(0, 20)}...</p>
                                                        </Tooltip>
                                                        :
                                                        usertask.task.project.description
                                                        }
                                                        </div>
                                                    </div> */}
                                                
                                            
{/*                                  
                                            <div className="grid grid-cols-2">
                                                <p className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">{usertask.task.project.name}</p>
                                                <div className="rounded-2xl px-2 py-1 hover:bg-indigo-200 flex justify-center">
                                                {usertask.task.project.description.length > 20 ?
                                                <Tooltip content={
                                                    <div>
                                                        <p className="text-small font-bold">Description</p>
                                                        <p className="text-tiny">{usertask.task.project.description}</p>
                                                    </div>
                                                    }
                                                    placement="top-end"
                                                    closeDelay={0}
                                                    className="w-96 rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                                                    <p className="">{usertask.task.project.description.substring(0, 20)}...</p>
                                                </Tooltip>
                                                :
                                                usertask.task.project.description
                                                }
                                                </div>
                                            </div>
                                            }     */}