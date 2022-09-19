import { firebaseAdmin } from '../utils/firebaseAdmin'

export async function GetData<T>(path: string, handler: (snapshot: T) => void, onError: (err: any) => void) {
  return firebaseAdmin
    .database()
    .ref(path)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(snapshot => handler?.(snapshot))
    .catch(onError || (err => console.log(err)))
}

export async function GetData2<T>(path: string): Promise<T | null> {
  const snapshot = await firebaseAdmin
    .database()
    .ref(path)
    .once('value')
    .then(snapshot => snapshot.val() as T)
  if (snapshot) {
    return snapshot
  }
  return null
}

export async function UpdateData<T>(
  path: string,
  data: Partial<T>,
  handler?: () => void,
  onError?: (err: any) => void
) {
  return firebaseAdmin
    .database()
    .ref(path)
    .update(data)
    .then(_ => handler?.())
    .catch(onError || (err => console.log(err)))
}

export async function UpdateData2<T>(path: string, data: Partial<T>): Promise<void> {
  return firebaseAdmin.database().ref(path).update(data)
}

export async function SetData<T>(path: string, data: T, handler?: () => void, onError?: (err: any) => void) {
  return firebaseAdmin
    .database()
    .ref(path)
    .set(data)
    .then(_ => handler?.())
    .catch(onError || (err => console.log(err)))
}

export async function SetData2<T>(path: string, data: T): Promise<void> {
  return firebaseAdmin.database().ref(path).set(data)
}

export async function GetAndUpdateData<T>(path: string, handler: (snapshot: T) => T, onError?: (err: any) => void) {
  return firebaseAdmin
    .database()
    .ref(path)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(snapshot => handler(snapshot))
    .then(data =>
      firebaseAdmin
        .database()
        .ref(path)
        .update(data)
        .catch(error => {
          throw error
        })
    )
    .catch(onError || (err => console.log(err)))
}

export async function PushData<T>(
  path: string,
  data: T,
  handler?: (key: string) => void,
  onError?: (err: any) => void
) {
  return firebaseAdmin
    .database()
    .ref(path)
    .push(data)
    .then(ref => {
      if (ref.key != null) {
        handler?.(ref.key)
      } else {
        throw Error('key is not assigned')
      }
    })
    .catch(onError || (err => console.log(err)))
}

export async function PushData2<T>(path: string, data: T): Promise<string | null> {
  return firebaseAdmin
    .database()
    .ref(path)
    .push(data)
    .then(ref => ref.key)
}
