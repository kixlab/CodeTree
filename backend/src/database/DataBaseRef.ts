import { firebaseAdmin } from '../utils/firebaseAdmin'

export async function GetData<T>(path: string): Promise<T> {
  const snapshot = await firebaseAdmin
    .database()
    .ref(path)
    .once('value')
    .then(snapshot => snapshot.val() as T)
  if (snapshot) {
    return snapshot
  } else {
    throw new Error(`데이터베이스에서 ${path}를 찾을 수 없습니다.`)
  }
}

export async function UpdateData<T>(path: string, data: Partial<T>): Promise<void> {
  return firebaseAdmin.database().ref(path).update(data)
}

export async function SetData<T>(path: string, data: T): Promise<void> {
  return firebaseAdmin.database().ref(path).set(data)
}

export async function PushData<T>(path: string, data: T): Promise<string> {
  return firebaseAdmin
    .database()
    .ref(path)
    .push(data)
    .then(ref => {
      if (ref.key === null) {
        throw Error('ID를 발급받는 데에 실패하였습니다.')
      }
      return ref.key
    })
}
