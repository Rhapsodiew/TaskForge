'use client'
import axios from "axios";
import { useState } from "react";

export default function Login() {

    interface LoginForm {
        username: string;
        password: string;
    }

    interface RegisterForm {
        username: string;
        email: string;
        password: string;
    }
    const [loginFormData, setLoginFormData] = useState<LoginForm> ({
        username: '',
        password: ''
    })

    const [registerFormData, setRegisterFormData] = useState<RegisterForm> ({
        username: '',
        email: '',
        password: ''
    })
    const handleLoginChange = (data: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = data.target;
        setLoginFormData(prevData => ({... prevData, [name]: value}))
    }

    const handleRegisterChange = (data: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = data.target;
        setRegisterFormData(prevData => ({... prevData, [name]: value}))
    }

    const handleLoginSubmit = async (data: React.ChangeEvent<HTMLInputElement>) => {
        data.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login',loginFormData);
            console.log(response)
            localStorage.setItem('token',response.data.access_token)
            window.location.href='/dashboard'
        } catch (err) {
            console.error(err)
        }
    }
    const handleRegisterSubmit = async (data: React.ChangeEvent<HTMLInputElement>) => {
        data.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/create', registerFormData);
            console.log(response)
            alert('User created successfully')

            try {
                const response = await axios.post('http://localhost:3000/auth/login',
                    {
                        username: registerFormData.username,
                        password: registerFormData.password
                    }
                );
                console.log(response)
                localStorage.setItem('token',response.data.access_token)
                window.location.href='/dashboard'
            } catch (err) {
                alert(err.response.data.message)
                console.error(err)
            }

        } catch (err) {
            alert(err.response.data.message)
            console.error(err)
        }
    }

    
    return (        
        <div className="">
            <h1 className="text-2xl font-bold text-indigo-50 bg-indigo-950">Login</h1>
            {/* <p>{loginFormData.username}{loginFormData.password}</p> */}
            <div className="flex justify-center gap-8">
                <form className="p-6 rounded-b-3xl bg-indigo-950 font-bold">
                    <div>
                        <label htmlFor="username" className="text-lg text-indigo-50">Username</label>
                        <br/>
                        <input className="rounded-xl px-2" type="text" name="username" id="username" placeholder="Nom d'utilisateur" required minLength={3} 
                        onChange={handleLoginChange}value={loginFormData.username}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="password" className="text-lg text-indigo-50">Password</label>
                        <br/>
                        <input className="rounded-xl px-2" type="password" name="password" id="pass" placeholder="Mot de passe" required minLength={2}
                        onChange={handleLoginChange}value={loginFormData.password}/>
                    </div>
                    <br/>
                    <div className="flex justify-center bg-indigo-900/75 hover:bg-indigo-900/50 p-2 mx-8 rounded-3xl">
                        <button onClick={handleLoginSubmit} className="text-lg text-indigo-50">Login</button>
                    </div>
                </form>


                <form className="p-6 rounded-b-3xl bg-indigo-950 font-bold">
                    <div className="pb-1">
                        <label htmlFor="username" className="text-lg text-indigo-50">Username</label>
                        <br/>
                        <input className="rounded-xl px-2" type="text" name="username" id="username" placeholder="Nom d'utilisateur" required minLength={3} 
                        onChange={handleRegisterChange}value={registerFormData.username}/>
                    </div>
                    <div className="pb-1">
                        <label htmlFor="email" className="text-lg text-indigo-50">Email</label>
                        <br/>
                        <input className="rounded-xl px-2" type="email" name="email" id="email" placeholder="Email" required minLength={3}
                        onChange={handleRegisterChange}value={registerFormData.email}  />
                    </div>
                    <div className="pb-1">
                        <label htmlFor="password" className="text-lg text-indigo-50">Password</label>
                        <br/>
                        <input className="rounded-xl px-2" type="password" name="password" id="pass" placeholder="Mot de passe" required minLength={2}
                        onChange={handleRegisterChange}value={registerFormData.password}/>
                    </div>
                    <br/>
                    <div className="flex justify-center bg-indigo-900/75 hover:bg-indigo-900/50 p-2 mx-8 rounded-3xl">
                        <button onClick={handleRegisterSubmit} className="text-lg text-indigo-50">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}