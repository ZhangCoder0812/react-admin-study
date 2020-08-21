import service from "../utils/request";

export function TableList(params){
    return  service.request({
        url:params.url,
        method:params.method || 'post',
        data:params.data,   // post
    })
}

// 删除列表
export function TableDelete(params){
    return  service.request({
        url:params.url,
        method:params.method || 'post',
        data:params.data,   // post
    })
}