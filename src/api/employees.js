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

export const getEmployeeListApi = (page, size) => {
  return request({
    url: '/sys/user',
    params: {
      page,
      size
    }
  })
}
/**
 * 删除员工
 * @param {*} id
 * @returns
 */
export const delEmployeeApi = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
/**
 * 新增
 * @param {*} data
 * @returns
 */
export const addEmployeeApi = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
export const batchAddEmployeeApi = list => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data: list
  })
}
