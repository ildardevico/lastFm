/*@flow*/
import config from '../../../config'
import md5 from 'js-md5'

type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body: string | {[key: string]: any} | any,
  headers: {[key: string]: string},
  query: string | {[key: string]: string}
}

let sessionKey,
  client = fetchClient

function serialize (data: {[key: string]: any}, prefix?: string): string {
  const body = [`api_key=${config.apiKey}`]
  data && Object.keys(data).forEach(key => {
    const value = data[key]
    const name = prefix ? `${prefix}[${key}]` : key
    if (typeof value === 'object') {
      body.push(serialize(value, name))
    } else {
      body.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
    }
  })

  if(sessionKey) body.push(`sk=${sessionKey}`)

  body.push('format=json')

  return body.join('&')
}

export function setSessionKey(key: string) {
  sessionKey = key
}

export function getSessionKey() {
  return sessionKey
}

function fetchClient(url, params) {
  return fetch(url, params)
    .then(response => {
      if (response.status != 200) {
        throw response
      } else {
        return response.json()
      }
    })
}

export function  getApiSignature({ method, token }) {
  const { apiKey, secret } = config
  return md5(`api_key${apiKey}method${method}token${token}${secret}`)
}

export function setClient(newClient: Function) {
  client = newClient
}

export function callApi(params: RequestOptions | any, url: string = '',  endpoint = null) {
  if (typeof params.query === 'object') {
    url += `?${serialize(params.query)}`
  } else if (typeof params.query === 'string') {
    url += `?${params.query}`
  }

  if (params.body && typeof params.body !== 'string' && !(params.body instanceof FormData)) {
    params.body = serialize(params.body)
  }

  params.headers = {
    ...(params.headers || {}),
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  }

  const { method, headers, body } = params
  const preparedUrl = process.env.TEST ? url :`${endpoint ? endpoint : config.endpoint}${url}`

  return client(
    preparedUrl,
    {
      method: method || 'GET',
      headers,
      body
    }
  )
}
