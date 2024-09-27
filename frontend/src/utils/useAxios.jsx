import axios from 'axios'
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'


const baseURL = "https://chatty-backend-two.vercel.app/api"


const useAxios = () => {

  const {authToken, setUser, setAuthToken} = useContext(AuthContext)


  const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${authToken?.access}`}
  })

  axiosInstance.interceptors.request.use(async req => {
    const user = jwtDecode(authToken.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (isExpired) return req

    const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authToken.refresh
    })

    localStorage.setItem("authToken", JSON.stringify(response.data))

    setAuthToken(response.data)
    setUser(jwtDecode(response.data.access))

    req.headers.Authorization = `Bearer ${authToken?.access}`

    return req

  })

  return axiosInstance
}

export default useAxios
