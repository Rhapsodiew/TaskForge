import  api  from "../api"

export const getProfileUser = async () => {
    return await api.get('/auth/profile').then((response) => response.data)
}