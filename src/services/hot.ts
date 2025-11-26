import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

type hotParams = PageParams & { subType?: string }
/**
 * 首页-热门推荐-小程序
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommendApi = (url: string, data?: hotParams) =>
  http<HotResult>({
    method: 'GET',
    url,
    data,
  })
