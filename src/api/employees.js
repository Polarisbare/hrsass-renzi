import request from '@/utils/request'

/**
 * 获取员工简单数据列表
 * @returns
 */
export const getSimpleUserListApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}
