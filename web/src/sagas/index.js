import { all, call, put } from 'redux-saga/effects';
import { SET_CURRENT_USER, INIT_APP } from '../types';
import gql from '../api/gql';

function* initApp(){
  //const { app } = yield select()

  const q = `query me{me{first_name,last_name,avatar{url},roles{name},team_id,team_role}}`
  var user = yield call(()=>gql.request(q).then(res => res.me).catch(err => {
    localStorage.removeItem('_token')
    return null
  }))
  yield put({
    type: SET_CURRENT_USER,
    payload: user
  })
  yield put({
    type: INIT_APP,
  })
}

export default function* rootSaga() {
  yield all([
    call(initApp)
  ])
}