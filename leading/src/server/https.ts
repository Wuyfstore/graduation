import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.withCredentials = false
// axios.create({ baseURL: import.meta.env.VITE_APP_BASE_API })

export const addData = (url: string, data: any) => axios.post(url, data).then((res) => res.data)

export const getAllDatas = (url: string, path: any = '', query?: any) =>
  axios.get(url + `/${path}`, { params: { ...query } }).then((res) => res.data)

// export const getLoginUser = (url: string, uerInfo: any) =>
//   axios.get(url, { params: { ...uerInfo } }).then((res) => res.data)

export const updateData = (url: string, path: any, data: any) =>
  axios.patch(`${url}/${path}`, data).then((res) => res.data)

export const deleteData = (url: string, data: any) =>
  axios.delete(`${url}/${data}`).then((res) => res.data)
