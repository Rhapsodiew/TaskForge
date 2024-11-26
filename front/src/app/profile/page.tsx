'use client'
import CardNavigation from "@/components/Card-navigation";
import { getProfileUser } from "@/services/Auth/AuthService";
import { getMyUser, updateMyUser } from "@/services/User/UsersService";
import { useEffect, useState } from "react";
import { IUser, IUserToModify } from "../shared/interfaces";

export default function Profile() {


    const [dataAll, setDataAll] = useState<IUser>({id: 0, username: '', email: '', password: '', role: ''}); 
    useEffect(() => {
        getProfileUser().then((data) => {
            let userData = getMyUser()    
            userData.then(function(result) {
                setDataAll(result)
                //console.log('setDataAll', setDataAll((prev) => ({...prev, username: result.username})))
             })
        })
    }, [])



    const [dataToModify, setDataToModify] = useState<IUserToModify>({username: dataAll.username, email: dataAll.email, password: dataAll.password})
 

    const handleChange = (data: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = data.target;
        // console.log(name, value)
        setDataToModify(prevData => ({... prevData, [name]: value}))
    }


    const handleEmail = () => {
        console.log('email')
        updateMyUser('email', dataToModify.email);
    }

    const handleUsername = () => {
        console.log('username')
        updateMyUser('username', dataToModify.username)
    }

    const handlePassword = () => {
        console.log('password')
        updateMyUser('password', dataToModify.password)
    }

    

    return (
        <div>
            <h1 className="text-lg font-bold text-indigo-50 bg-indigo-950 weh">Profile</h1>
            <CardNavigation username={dataAll.username} />
            <br />
            <div className="flex items-center flex-col">
                <div className="flex items-center flex-col ml-8 w-60 bg-indigo-100 p-8 rounded-2xl">
                    <div className="hover:bg-indigo-200 p-2 rounded-2xl font-bold flex flex-col items-center">
                        <p>Username:</p>
                        <p>{dataAll.username}</p>
                    </div>
                    <div className="hover:bg-indigo-200 p-2 rounded-2xl font-bold flex flex-col items-center">
                        <p >Email:</p>
                        <p>{dataAll.email}</p>
                    </div>
                    <div className="hover:bg-indigo-200 p-2 rounded-2xl font-bold flex flex-col items-center">
                        <p >Password:</p>
                        <p>{dataAll.password}</p>
                    </div>
                    <div className="hover:bg-indigo-200 p-2 rounded-2xl font-bold flex flex-col items-center">
                        <p >Role:</p>
                        <p> {dataAll.role}</p>
                    </div>
                </div>
                <div className="flex flex-row ">
                    <div className="py-4">
                        <input type="text" name="username" placeholder="New username" className="m-1 bg-indigo-200 border-2 border-indigo-200 hover:border-indigo-300 hover:border-2 p-2 rounded-2xl font-bold" 
                        onChange={handleChange} value={dataToModify.username}/>
                        <p onClick={handleUsername} className="m-1 w-56 bg-indigo-200 border-2 border-indigo-200 hover:border-indigo-300 hover:border-2 p-2 rounded-2xl font-bold">Change Username</p>
                    </div>
                    <div className="py-4">
                        <input type="text" name="email" placeholder="New email" className="m-1 bg-indigo-200 border-2 border-indigo-200 hover:border-indigo-300 hover:border-2 p-2 rounded-2xl font-bold"
                        onChange={handleChange} value={dataToModify.email} />
                        <p onClick={handleEmail} className="m-1 w-56 bg-indigo-200 border-2 border-indigo-200 hover:border-indigo-300 hover:border-2 p-2 rounded-2xl font-bold">Change Email</p>
                    </div>
                    <div className="py-4">
                        <input type="text" name="password" placeholder="New password" className="m-1 bg-indigo-200 border-2 border-indigo-200 hover:border-indigo-300 hover:border-2 p-2 rounded-2xl font-bold"
                        onChange={handleChange} value={dataToModify.password} />
                        <p onClick={handlePassword} className="m-1 w-56 bg-indigo-200 border-2 border-indigo-200 hover:border-indigo-300 hover:border-2 p-2 rounded-2xl font-bold">Change Password</p>
                    </div>

                </div>
            </div>
        </div>
    )
}