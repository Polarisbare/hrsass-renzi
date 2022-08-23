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
