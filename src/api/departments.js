/**
 *部门列表
 */
import request from '@/utils/request'

export const getDepartmentsListApi = async() => {
  return await request({
    url: '/company/department'
  })
}
export const delDepartmentApi = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
/**
 * 添加部门
 * @param {*} data
 * @returns
 */
export const addDepartmentApi = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
/**
 * 修改部门
 * @param {*} id
 * @returns
 */
export const getDepartmentDetailApi = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}
