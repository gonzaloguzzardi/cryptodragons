import axios from 'axios'

type Data = {
  token?: string
  error?: string
}

export const postLoginData = (username: string, password: string): Promise<Data> =>
  axios
    .post(`/api/admin/login`, { username, password })
    .then(({ data }) => ({ token: data.token }))
    .catch((err) => {
      throw new Error(err.response.data.error)
    })
