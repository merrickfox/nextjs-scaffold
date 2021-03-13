import Cookies from "js-cookie";
import {IncomingMessage, ServerResponse} from "http";

interface standardResponse {
  error: boolean
  errorMessage?: string
  errorCode?: string
  data: any
}

interface refreshResponse {
  accessToken: string
  refreshToken: string
}

type req = IncomingMessage & {
  cookies?: { [key: string]: any }
} | undefined
type cookies = {[key: string]: any} | undefined
type headers = {[key: string]: string} | undefined
type res = ServerResponse | undefined

export const login = async (password: string, email: string) => {
  const body: string = JSON.stringify({
    password,
    email
  });

  const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
    method: 'post',
    credentials: 'include',
    body,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return await responseTransformer(loginResponse)
}

export const user = async (req?: req, res?: res) => {
  const headers = await createHeaders(req, res)
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
    method: 'get',
    headers,
  })

  return await responseTransformer(userResponse)
}

const responseTransformer = async (response: any): Promise<standardResponse> => {
  let standardResponse = {
    error: false,
    errorMessage: undefined,
    errorCode: undefined,
    data: {}
  }
  const json = await response.json()
  console.log('status: ', response.status)
  if (!response.ok) {
    standardResponse.error = true
    standardResponse.errorMessage = json.message
    standardResponse.errorCode = json.code
  } else {
    standardResponse.data = json
  }

  return standardResponse
}

const refresh = async (req: req, res: res): Promise<string | undefined> => {
  const refreshToken = Cookies.get('refreshToken') || req?.cookies?.refreshToken
  if (!refreshToken) return undefined;

  const body: string = JSON.stringify({
    refreshToken,
  });

  let accessExpiry = new Date()
  accessExpiry.setMinutes(accessExpiry.getMinutes()+15);
  let refreshExpiry = new Date()
  refreshExpiry.setHours(refreshExpiry.getHours()+24);
  const refreshResponse: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}refresh`, {
    method: 'post',
    credentials: 'include',
    body,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (refreshResponse.ok) {
    const refreshResponseJson = await refreshResponse.json()
    res?.setHeader('Set-Cookie', [
      `accessToken=${refreshResponseJson.accessToken}; Expires=${accessExpiry.toUTCString()}; SameSite=Strict`,
      `refreshToken=${refreshResponseJson.refreshToken}; Expires=${refreshExpiry.toUTCString()}; SameSite=Strict`
    ]);

    return refreshResponseJson.accessToken
  }
}

const createHeaders = async (req: req, res: res): Promise<headers> => {
  let accessToken
  if (!req?.cookies?.accessToken) {
    accessToken = Cookies.get('accessToken')
    if (!accessToken) {
      accessToken = await refresh(req, res)
    }
  } else {
    accessToken = req.cookies.accessToken
  }

  let headers: headers
  if (accessToken) {
    headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  } else {
    headers = {
      'Content-Type': 'application/json',
    }
  }

  return headers
}
