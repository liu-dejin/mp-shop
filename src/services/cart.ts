import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

/**
 * 加入购物车
 */
export const postMemberCartApi = (data: { skuId: string; count: number }) =>
  http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
/**
 * 获取购物车列表
 */
export const getMemberCartApi = () =>
  http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
/**
 * 删除购物车商品
 */
export const delectMemberCartApi = (data: { ids: string[] }) =>
  http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
/**
 * 修改购物车商品数量
 */
export const putMemberCartApi = (skuId: string, data: { selected?: boolean; count?: number }) =>
  http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
