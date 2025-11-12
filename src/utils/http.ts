import { useMemberStore } from '@/stores'

/**
 *
 */
const baseURL = 'https://pcapi-xiaotuxian-front.itheima.net'
//拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    //非http开头的拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //超时时间
    options.timeout = 10000
    //添加请求头
    options.header = {
      'source-client': 'miniapp',
      ...options.header,
    }
    //添加token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
