
import { all } from 'redux-saga/effects';
import authSaga from './AuthSaga'
import commonSaga from './CommonSaga';
import homeSaga from './HomeSaga';

//Main Root Saga
const rootSaga = function* rootSaga() {
  yield all([
    authSaga(),
    homeSaga(),
    commonSaga(),
  ])
}
export default rootSaga;
