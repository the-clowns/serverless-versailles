const axios = require('axios')

const { AppID, AppSecret } = require('../../env')

function getTenantAccessToken () {
  return axios.default.post('/auth/v3/tenant_access_token/internal/', {
    app_id: AppID,
    app_secret: AppSecret
  })
}

const feishuOpenRequestInstance = axios.default.create({
  baseURL: 'https://open.feishu.cn/open-apis',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

feishuOpenRequestInstance.interceptors.request.use(
  async (config) => {
    const { data } = await getTenantAccessToken()

    const token = data.tenant_access_token
    // Do something before request is sent
    const headers = {
      ...(config.headers || {}),
      Authorization: 'Bearer ' + token
    }
    return { ...config, headers }
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

module.exports = feishuOpenRequestInstance
