import request from '@/utils/request'
/**
 * 获取所有角色列表
 * @param {*} page 页数
 * @param {*} pagesize 页容量
 * @returns
 */
export const getRoleListApi = (page, pagesize) => {
  return request({
    url: '/sys/role',
    params: {
      page,
      pagesize
    }
  })
}
/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export const delRoleListApi = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
/**
 * 添加角色
 * @param {*} data
 * @returns
 */
export const addRoleApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
/**
 * 根据id获取角色详情（回显时）
 * @param {*} id
 * @returns
 */
export const getRoleDetailApi = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

export const updateRoleApi = (form) => {
  return request({
    url: `/sys/role/${form.id}`,
    method: 'PUT',
    data: form
  })
}
