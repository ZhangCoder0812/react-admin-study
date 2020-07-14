const router = [

    {
        title:'控制台',
        icon:'index',
        key:'/index'
    },
    {
        title:'用户管理',
        icon:'laptop',
        key:'/index/user',
        child:[
            {
                title:'用户列表',
                icon:'',
                key:'/index/user/list'
            },
            {
                title:'添加用户',
                icon:'',
                key:'/index/user/add'
            }
        ]
    }

]

export default router