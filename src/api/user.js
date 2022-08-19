import request from '@/utils/request'
/**
 * 登录接口
 * @param {*} data 登陆所需参数
 * @returns
 */
export const loginApi = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
