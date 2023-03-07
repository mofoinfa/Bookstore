import router from '../router'
import axios from 'axios'
import { Message } from 'element-ui'
const service=axios.create({
	baseURL:'http://wechat.5656dh.com',
	withCredentials:true
})
service.interceptors.response.use(function(res){
	if(res.data.code===401){
		Message.error('登陆失败')
		router.push('/')
	}
	return res.data
})
export default service