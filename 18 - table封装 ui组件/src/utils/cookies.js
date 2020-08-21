
import cookies from 'react-cookies'

const tokenAdmin = 'adminToken'
const user = 'username'

export function setToken(value) {
    cookies.save(tokenAdmin,value)
}

export function getToken(value) {
  return  cookies.load(tokenAdmin)
}

export function setUsername(value) {
    cookies.save(user,value)
}

export function getUsername(value) {
    return cookies.load(user)
}