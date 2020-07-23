// 自动化工程
// 第一个参数表示路径
// 第二个参数表示是否查找子目录
// 第三个参数表示查找的文件类型
const components=[]

const files = require.context("../../views/",true,/\.js$/)
files.keys().map(key=>{
    // 过滤到首页和登录页
    if(key.includes('./index/') || key.includes('./login/')){
        return false
    }
    const splitName = key.split('.')
    const jsonObj = {}
    const path = `/index/${splitName[1].toLowerCase()}`
    const component = files(key).default
    jsonObj.path=path
    jsonObj.component=component
    components.push(jsonObj)
})

console.log(components);

export default  components