import { store } from '../redux-toolkit/app/store'
export const getToken = store.getState().users.user.token
