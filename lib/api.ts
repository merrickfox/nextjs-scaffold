
interface standardResponse {
  error: boolean
  errorMessage?: string
  errorCode?: string
  data: any
}

type cookies = {[key: string]: any} | undefined
type headers = {[key: string]: string}

export const login = async (password: string, email: string) => {
  const body: string = JSON.stringify({
    password,
    email
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
    method: 'post',
    credentials: 'include',
    body,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return await responseTransformer(res)
}

export const user = async (cookies: cookies) => {
  const headers = createHeaders(cookies)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
    method: 'get',
    headers,
  })

  return await responseTransformer(res)
}

const responseTransformer = async (res: any): Promise<standardResponse> => {
  let standardResponse = {
    error: false,
    errorMessage: undefined,
    errorCode: undefined,
    data: {}
  }

  const json = await res.json()

  if (!res.ok) {
    standardResponse.error = true
    standardResponse.errorMessage = json.message
    standardResponse.errorCode = json.code
  } else {
    standardResponse.data = json
  }

  return standardResponse
}

const createHeaders = (cookies: cookies): headers => {
  let headers
  if (cookies?.accessToken) {
    headers = {
      'Authorization': `Bearer ${cookies?.accessToken}`,
      'Content-Type': 'application/json',
    }
  } else {
    headers = {
      'Content-Type': 'application/json',
    }
  }

  return headers
}
