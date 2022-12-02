import { ErrorResult } from '../protocol/Error'

export async function Get<P, R>(baseUrl: string, params: P): Promise<R> {
  const url = `${baseUrl}?${[...Object.entries(params as Record<string, unknown>)]
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`
  return fetch(url).then(res => res.json())
}

export async function Post2<P, R>(url: string, params: P): Promise<R> {
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(params),
  }).then(res => res.json())
}

export async function Post<P, R>(
  url: string,
  params: P,
  callback: (res: R) => void,
  onError: (error: ErrorResult) => void
) {
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(params),
  })
    .then(res => {
      if (res.ok) {
        res.json().then(callback)
      } else {
        res.json().then(onError)
      }
    })
    .catch(err => {
      onError({
        message:
          '데이터를 전송하는 데에 실패하였습니다. 작업하신 내용을 있다면 저장하시고, 페이지를 새로 고침하거나 다시 시도해주세요.',
        error: err,
      })
    })
}
