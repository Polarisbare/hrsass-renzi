import request from '@/utils/request'

export const getCompanyByIdApi = (id) => {
  return request({
    url: `/company/${id}`
  })
}
