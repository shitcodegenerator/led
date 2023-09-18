import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'




/** 錯誤處理 */
// const errorHandle = (status: number, data?: ErrorResponse): void => {
//   const user = useUserStore()
//   const errorContent = data?.code ? i18n.global.t(data.code) : data?.msg || ''
//   switch (status) {
//     case 400:
//       ElMessage.error(errorContent)
//       break
//     case 401:
//     case 403:
//       user.login = false
//       localStorage.removeItem('admin_token')
//       localStorage.removeItem('route')
//       router.replace({ path: '/login' })
//       if (data?.responseURL?.includes('users/me')) {
//         ElMessage.error(i18n.global.t('common.loginFirst'))
//       }
//       break
//     // 404请求不存在
//     case 404:
//       ElMessage.error(i18n.global.t(i18n.global.t('A0401')))
//       break
//     default:
//       ElMessage.error(i18n.global.t('internalServerError'))
//       break
//   }
//   setLoading(false)
// }


let baseUrl = ''

const getBaseUrl = () => {
  const savedBaseUrls = localStorage.getItem('baseUrl')
  if (!savedBaseUrls) return
  baseUrl = JSON.parse(savedBaseUrls)
}

getBaseUrl()

const baseURL = location.host.includes('localhost') ? '/proxyApi' : baseUrl

/** 創建axios實例 */
const instance = axios.create({
  timeout: 30000,
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/** 請求攔截器 */
instance.interceptors.request.use(
  (config) => {

    // 回傳圖檔
    if (config.url?.includes('upload')) {
      ;(config.headers)['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  (error) => Promise.reject(error)
)

/** 響應攔截器 */
instance.interceptors.response.use(
  // 請求成功
  (response) => {
    if (response.status === 200) return Promise.resolve(response)
    // errorHandle(response.data.code, response.data)
    return Promise.reject(response)
  },
  // 请求失败
  (error) => {
    const { response, request } = error
    console.log(response)
    // 请求已发出，但是不在2xx的范围
    if (response?.data && typeof response?.data === 'object') {
      response.data['responseURL'] = request.responseURL
    }
    // errorHandle(response?.status, response?.data)
    return Promise.reject(response)
  }
)

export default instance
