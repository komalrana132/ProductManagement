import {
    GET_NETWORK_STATUS_REQUEST,
    GET_REFRESH_TOKEN_REQUEST

} from '../Types'



export const updateNetwork = (params) => {
    return {
        type: GET_NETWORK_STATUS_REQUEST,
        params
    };
}

export const refreshToken = params => {
    return {
        type: GET_REFRESH_TOKEN_REQUEST,
        params
    }
}