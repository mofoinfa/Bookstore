import service from "../utils/request.js"
export function getQrcode(){
	return service.get('/index.php?type=getQrcode')
	
}
export function autoLogin(){
	return service.get('/index.php?type=autoLogin')
	
}
export function login(){
	return service.get('/index.php?type=login')
	
}