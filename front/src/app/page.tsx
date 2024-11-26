'use client'
import CardNavigation from "@/components/Card-navigation";
import { useEffect, useState } from "react";
import { IUser } from "./shared/interfaces";
import { getProfileUser } from "@/services/Auth/AuthService";


export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log('token', token)

    if (token !== null) {
      getProfileUser().then((data) => {
        console.log('data', data)
        if (data) {
          window.location.href = '/dashboard'
        } else {
          window.location.href = '/login'
        }
      })
    } else {
      window.location.href = '/login'
    }
  }, [])


  return (
    <div>
      <div>
        <h1 className="text-lg font-bold text-indigo-50 bg-indigo-950">TaskForge</h1>
      </div>
    </div>
  );
}
