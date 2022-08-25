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
