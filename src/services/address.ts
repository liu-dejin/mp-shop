import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

/**
 * 添加收货地址
 * @param data 收货地址参数
 */
export const postMemberAddressApi = (data: AddressParams) =>
  http({
    method: 'POST',
    url: '/member/address',
    data,
  })
/**
 * 获取收获列表
 */
export const getMemberAddressApi = () =>
  http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })

/**
 * 获取收获详细地址
 * @params id: 地址id
 */
export const getMemberAddressByIdApi = (id: string) =>
  http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
