import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import axios from "axios";

interface ICardNavProps {
    username: string
}

const handleLogout = async (data: React.ChangeEvent<HTMLInputElement>) => {
    data.preventDefault();
    try {
        localStorage.removeItem('token');
        window.location.href='/login'
    } catch (err) {
        console.error(err)
    }
}

const CardNavigation = ({username}: ICardNavProps) => {
    return (
        <div>
            <ul className="flex items-center flex-row justify-end shadow-lg bg-indigo-950 py-2">
                <li className="border border-indigo-950 hover:border-slate-50 px-8 mx-2 py-3 rounded-3xl bg-indigo-900" >
                    <p>
                        <a href="http://localhost:3001/dashboard" 
                        className="font-bold text-indigo-50 hover:text-indigo-200">Dashboard</a>
                    </p>
                </li>
                <li className="px-8 border border-indigo-950 hover:border-slate-50 mx-2 py-3 rounded-3xl bg-indigo-900">
                    <p>
                        <a href="http://localhost:3001/tasks" 
                        className="font-bold text-indigo-50 hover:text-indigo-200">Tasks</a>
                    </p>
                </li>
                <li className="px-8 mx-2 py-3 border border-indigo-950 hover:border-slate-50 rounded-3xl bg-indigo-900">
                    <Dropdown placement="bottom-end" offset={21} className="select-none">
                        <DropdownTrigger>
                            <p className="font-bold text-indigo-50 hover:text-indigo-200 cursor-pointer">Profile</p>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" className="bg-indigo-800 p-4 rounded-lg text-indigo-50 ">
                            <DropdownItem className="cursor-default py-2">
                                <p className="font-bold">Connected As</p>
                                <p className="font-extrabold text-lg">{username}</p>
                            </DropdownItem>
                            <DropdownItem key='Settings' href="/###">
                                <p className=" border border-indigo-800 hover:bg-indigo-700 p-2 rounded-2xl">
                                    Settings
                                </p>
                            </DropdownItem>
                            <DropdownItem key='Profile' href="/profile">
                                <p className="border border-indigo-800 hover:bg-indigo-700 p-2 rounded-2xl">
                                    Profile
                                </p>
                            </DropdownItem>
                            <DropdownItem key='Logout' className="">
                                {/* {username === "Guest" ?
                                <p className="border border-indigo-800 hover:bg-indigo-700 p-2 rounded-2xl" onClick={handleLogout}>Log In</p>
                                : */}
                                <p className="border border-indigo-800 hover:bg-indigo-700 p-2 rounded-2xl" onClick={handleLogout}>Log Out</p>
                                {/* } */}
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                </li>
            </ul>
        </div>
    )
}



// const styles = StyleSheet.create({
//     liste: {
//     }
// })
export default CardNavigation
            