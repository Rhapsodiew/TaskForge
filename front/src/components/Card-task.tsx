import { updateStatus, } from "@/services/Tasks/TasksService";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";

interface ICardTaskProps {
    id: number,
    index: number,
    title: string,
    description: string,
    due_date: string, // TYPE DATE ?? DONT KNOW ??
    priority: string,
    project_name: string,
    status: string,
    username: string
}
// className="justify-end relative divide-x shadow hover:shadow-lg
const CardTask = ({id, index, title, description, due_date, priority, project_name, status, username}: ICardTaskProps) => {
    const [selectedKeys, setSelectedKeys] = useState(status);
    
    const listStatus = ['A faire', 'En cours', 'Complete']
    const handleChange = (key:string ) => {
        // console.log("key, id ",key, id )
        updateStatus(id,+key)
    }
    const due_date_cut = due_date.split('T')[0];

    return (
        <div>
            <div className="">
                <div className="grid grid-cols-8">
                    <p className="bg-indigo-100 border-r border-indigo-900/50 flex justify-center items-center">{index}</p>
                    {title.length > 20 ?
                    <Tooltip content={
                        <div>
                            <div className="text-small font-bold">Title</div>
                            <div className="text-tiny">{title}</div>
                        </div>
                    } 
                    placement="top-end"
                    closeDelay={0}
                    className="rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                        <p className="bg-indigo-200 border-r border-indigo-900/50 flex justify-center">{title.substring(0,20)}...</p>
                    </Tooltip>
                    :
                    <p className="bg-indigo-200 border-r border-indigo-900/50 flex justify-center">{title}</p>

                    }
                    <div className="flex justify-center items-center bg-indigo-100 border-r border-indigo-900/50">
                    {description.length > 20 ?
                    <Tooltip content={
                        <div>
                            <div className="text-small font-bold">Description</div>
                            <div className="text-tiny">{description}</div>
                        </div>
                    } 
                    placement="top-end" 
                    closeDelay={0} 
                    className="rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                        <p className="">{description.substring(0, 20)}...</p>
                        {/* <p className="px-8 bg-slate-300 border-r border-indigo-900/50 flex justify-center items-center">{description}</p> */}
                    </Tooltip>
                    :
                    <p className="">{description}</p>
                    
                    }
                    </div>
                    <p className="bg-indigo-200 border-r border-indigo-900/50 flex justify-center items-center"> {due_date_cut}</p>
                    <p className="bg-indigo-100 border-r border-indigo-900/50 flex justify-center items-center">{priority}</p>
                    <p className="bg-indigo-200 border-r border-indigo-900/50 flex justify-center items-center">{project_name}</p>

                    <Dropdown>
                        <DropdownTrigger>
                            <p className="bg-indigo-100 border-r border-indigo-900/50 flex justify-center items-center">{selectedKeys}</p>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={status}
                            onSelectionChange={(key) => {
                                // console.log(key);
                                const currentKey = parseInt(key.currentKey!)
                                setSelectedKeys(listStatus[currentKey-1])
                                handleChange(key.currentKey as string)
                            }}
                            
                            className="bg-indigo-800 text-indigo-50 p-4 rounded-lg"
                        >
                            <DropdownItem key='1' className="cursor-pointer font-bold">A Faire</DropdownItem>
                            <DropdownItem key='2' className="cursor-pointer font-bold">En cours</DropdownItem>
                            <DropdownItem key='3' className="cursor-pointer font-bold">Complete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    
                    <p className="px-8 bg-indigo-200 border-r border-indigo-900/50 flex justify-center items-center">{username}</p>
                </div>
            </div>
        </div>
    )
}
export default CardTask