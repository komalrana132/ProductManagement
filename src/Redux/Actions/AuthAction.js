import {
        GET_LOGIN_REQUEST, TEST_ENCRYPTION_REQUEST, GET_REGISTER_REQUEST
} from '../Types'

export const loginRequest = (params) => {
    return{
        type : GET_LOGIN_REQUEST,
        params
    };
}

export const testEncryptionRequest = (params) => {
    return{
        type : TEST_ENCRYPTION_REQUEST,
        params
    };
}

export const registerRequest = (params) => {
    return{
        type : GET_REGISTER_REQUEST,
        params
    };
}
