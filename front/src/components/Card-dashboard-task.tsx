import { updateStatus, } from "@/services/Tasks/TasksService";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";

interface ICardDashboardTask {
    id: number,
    index: number,
    title: string,
    description: string,
    due_date: string, // TYPE DATE ?? DONT KNOW ??
    priority: string,
    status: string,
    username: string
}
// className="justify-end relative divide-x shadow hover:shadow-lg
const CardDashboardTask = ({id, index, title, description, due_date, priority, status, username}: ICardDashboardTask) => {
    const [selectedKeys, setSelectedKeys] = useState(status);
    
    const listStatus = ['A faire', 'En cours', 'Complete']
    const handleChange = (key:string ) => {
        console.log("key, id ",key, id )
        updateStatus(id,+key)
    }
    const due_date_cut = due_date.split('T')[0];
    // console.log(due_date_cut)
    const complete_description = description;
    if (description.length > 13){
        description = description.substring(0,12) + ' ...';
    }
    return (
        <div>
            <div >
                <div className="grid grid-cols-7 ">
                    <p className="px-8 bg-slate-100 border-r border-indigo-900/50 flex justify-center items-center">{index}</p>
                    <p className="px-8 bg-slate-200 border-r border-indigo-900/50 flex justify-center items-center">{title}</p>
                    

                    <Tooltip content={
                        <div>
                            <div className="text-small font-bold">Description</div>
                            <div className="text-tiny">{complete_description}</div>
                        </div>
                    } placement="top-end" closeDelay={0} className="rounded-lg bg-indigo-900 text-indigo-50 p-4 ">
                        <p className="px-8 bg-slate-300 border-r border-indigo-900/50 flex justify-center items-center">{description}</p>
                    </Tooltip>
                   
                    <p className="px-8 bg-slate-400 border-r border-indigo-900/50 flex justify-center items-center"> {due_date_cut}</p>
                    <p className="px-8 bg-slate-500 border-r border-indigo-900/50 flex justify-center items-center">{priority}</p>
                    {/* <p className="px-8 bg-slate-400 border-r border-indigo-900/50 flex justify-center items-center">{project_name}</p> */}

                    
                            <p className="px-8 bg-slate-300 border-r border-indigo-900/50 flex justify-center items-center">{selectedKeys}</p>
                    <p className="px-8 bg-slate-200 border-r border-indigo-900/50 flex justify-center items-center">{username}</p>
                </div>
            </div>
        </div>
    )
}
export default CardDashboardTask