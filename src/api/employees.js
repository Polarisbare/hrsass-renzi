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
export const batchAddEmployeeApi = (list) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data: list
  })
}

/** *
 * 保存员工的基本信息
 * **/
export function saveUserDetailByIdApi(data) {
  return request({
    method: 'put',
    url: `/sys/user/${data.id}`,
    data
  })
}

/** *
 *  更新用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function updatePersonalApi(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}
/** *
 *  读取用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function getPersonalDetailApi(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/personalInfo`
  })
}

/** **
 * 获取用户的岗位信息  (岗位信息)
 * ****/
export function getJobDetailApi(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息  (岗位信息)
 * ****/
export function updateJobApi(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}
/**
 * 获取员工基本信息 (包含头像)
 * @param {*} id
 * @returns
 */
export function getUserDetailByIdApi(id) {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}
/**
 * 给员工分配角色
 * @param {*} data
 * @returns
 */
export const getEmployeeRoleApi = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
