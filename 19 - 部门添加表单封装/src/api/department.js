import service from '../utils/request'


export function DepartmentAddApi(data){
  return  service.request({
            url:'/department/add/',
            method:'post',
            data,   // post
        })
}




export function GetList(data){
    return  service.request({
        url:data.url,
        method:'post',
        data,   // post
    })
}



export function Status(data){
    return  service.request({
        url:'/department/status/',
        method:'post',
        data,   // post
    })
}


export function Detail(data){
    return  service.request({
        url:'/department/detailed/',
        method:'post',
        data,   // post
    })
}

export function Edit(data){
    return  service.request({
        url:'/department/edit/',
        method:'post',
        data,   // post
    })
}
