import service from '../utils/request'


export function DepartmentAddApi(data){
  return  service.request({
            url:'/department/add/',
            method:'post',
            data,   // post
        })
}




