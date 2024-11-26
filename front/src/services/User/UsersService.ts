import api from "../api"


export const getMyUser = async () => {
    console.log(await api.get('/users/myuser').then((response) => response.data))
    return await api.get('/users/myuser').then((response) => response.data)
}

export const getAllUsers = async () => {
    return await api.get('/users').then((response) => response.data)
}

export const updateMyUser = async (datatomodify: string, data: string) => {
    console.log(datatomodify, data)
    await api.put('/users/updatemyuser', 
        {
            [datatomodify]: data
        }
    )
    window.location.reload();
}