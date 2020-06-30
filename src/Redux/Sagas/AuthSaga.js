import { put, call, takeEvery } from 'redux-saga/effects'

import Api from '../Services/api';

import {
    TEST_ENCRYPTION_REQUEST,
    TEST_ENCRYPTION_SUCCESS,
    TEST_ENCRYPTION_FAILED,


    RESET_AUTH_REQUEST,
    RESET_AUTH,
    
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILURE,
    GET_LOGIN_REQUEST,
    GET_REGISTER_SUCCESS,
    GET_REGISTER_FAILURE,
    GET_REGISTER_REQUEST,


    LOGOUT_SUCCESS,
    LOGOUT_FAILED



} from '../Types';



export const loginSaga = function* loginSaga({params}){
    try {
        console.log("*****************PARAMS************* \n ",params);
        const response = yield call(Api.login, params)
        yield put({type : GET_LOGIN_SUCCESS, payload : response})
    } catch (e) {
        console.log("************ERROR*************** \n ", e);
        yield put({type : GET_LOGIN_FAILURE, payload : e})
        
    }
}

export const logOut = function* logOut({params}){
    try {
        console.log("*****************PARAMS************* \n ",params);
        const response = yield call(Api.loginOut, params)
        yield put({type : LOGOUT_SUCCESS, payload : response})
    } catch (e) {
        console.log("************ERROR*************** \n ", e);
        yield put({type : LOGOUT_FAILED, payload : e})
        
    }
}

// ===========>>>>>>>>>> testencryption OTP SAGA <<<<<<<<<<<<===========
export const testEncryptionSaga = function* testEncryptionSaga({ params }) {
    try {
        const response = yield call(Api.testEncryption, params)
        yield put({ type: TEST_ENCRYPTION_SUCCESS, payload: response });
    }
    catch (e) {
        console.log("*****************ERROR************* \n ",e);
        yield put({ type: TEST_ENCRYPTION_FAILED, payload: e });
    }
}

// ===========>>>>>>>>>> REGISTER SAGA <<<<<<<<<<<<===========
export const registerSaga = function* registerSaga({ params }) {
    try {
        const response = yield call(Api.register, params)
        yield put({ type: GET_REGISTER_SUCCESS, payload: response });
    }
    catch (e) {
        console.log("*****************ERROR************* \n ",e);
        yield put({ type: GET_REGISTER_FAILURE, payload: e });
    }
}



// ===========>>>>>>>>>> SIGNUP SAGA <<<<<<<<<<<<===========
export const signUpSaga = function* signUpSaga({ params }) {
    try {
        console.log("*****************PARAMS************* \n ",params);
        const response = yield call(Api.signUp, params)
        yield put({ type: BECOME_SELLER_SIGNUP_SUCCESS, payload: response });
        console.log("*****************RESPONCE************* \n ",response);
    }
    catch (e) {
        console.log("*****************ERROR************* \n ",e);
        yield put({ type: BECOME_SELLER_SIGNUP_FAILED, payload: e });
    }
}


export const resetAuthSaga = function* resetAuthSaga() {
    yield put({type: RESET_AUTH})
}

export function* authSaga() {
    yield takeEvery(GET_LOGIN_REQUEST,loginSaga)
    yield takeEvery(GET_REGISTER_REQUEST, registerSaga);
    yield takeEvery(TEST_ENCRYPTION_REQUEST, testEncryptionSaga);
    yield takeEvery(RESET_AUTH_REQUEST,resetAuthSaga);

}
export default authSaga;