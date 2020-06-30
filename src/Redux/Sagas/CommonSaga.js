import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'

import Api from '../Services/api';
import {

    GET_NETWORK_STATUS_REQUEST,
    GET_NETWORK_STATUS_SUCCESS,
    GET_NETWORK_STATUS_FAILED,
   
    GET_REFRESH_TOKEN_REQUEST,
    GET_REFRESH_TOKEN_SUCCESS,
    GET_REFRESH_TOKEN_FAILED,
} from '../Types';

export const getNetWorkSaga = function* getNetWorkSaga({ params }) {
    try {
        yield put({ type: GET_NETWORK_STATUS_SUCCESS, payload: params });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_NETWORK_STATUS_FAILED, payload: e });
    }
}



export const refreshTokenSaga = function* refreshTokenSaga({ params }) {
    try {
        const response = yield call(Api.refreshToken, params)
        yield put({ type: GET_REFRESH_TOKEN_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_REFRESH_TOKEN_FAILED, payload: e });
    }
}





export function* commonSaga() {
    yield takeEvery(GET_NETWORK_STATUS_REQUEST, getNetWorkSaga);
    yield takeEvery(GET_REFRESH_TOKEN_REQUEST, refreshTokenSaga);
}

export default commonSaga;