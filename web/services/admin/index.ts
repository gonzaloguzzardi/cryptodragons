import axios from 'axios'

type GetSessionDataResponse = any // @TODO: Type this
export const getSessionAdmin = (token: string): Promise<GetSessionDataResponse> =>
  axios
    .get('/api/admin/session/test', { headers: { Authorization: token } })
    .then(({ data }) => data)
    .catch(({ response }) => {
      throw new Error(response.data.error)
    })

type PostLoginDataResponse = {
  token?: string
  error?: string
}
export const postLoginData = (username: string, password: string): Promise<PostLoginDataResponse> =>
  axios
    .post('/api/admin/login', { username, password })
    .then(({ data }) => data)
    .catch(({ response }) => {
      throw new Error(response.data.message)
    })
