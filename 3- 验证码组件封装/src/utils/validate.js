
export const validate_password=/^(?![0,9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

// 验证邮箱

const reg_email =  /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/

export function validate_email(value) {
    return reg_email.test(value)
}
