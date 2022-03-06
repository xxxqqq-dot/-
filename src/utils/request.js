import axios from 'axios'
let request = axios.create({
  baseURL: '/proxy',
  timeout: 5000,
  // withCredentials: true,
})
request.interceptors.request.use(config => {
  let token = window.localStorage.getItem('loginInfo')
  if(token){
    config.headers.Authorization = JSON.parse(token).token
  }
  return config
}, error => {
  console.log('错误')
  Promise.reject(error)
})
export default request