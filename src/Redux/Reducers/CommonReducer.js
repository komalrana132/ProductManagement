import {
    GET_NETWORK_STATUS_SUCCESS,
    GET_NETWORK_STATUS_FAILED,
    GET_REFRESH_TOKEN_SUCCESS,
    GET_REFRESH_TOKEN_FAILED,
} from '../Types';


const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_NETWORK_STATUS_SUCCESS:
            return { ...state, isNetworkAvailable: action.payload }

        case GET_NETWORK_STATUS_FAILED:
            return { ...state, isNetworkAvailableFailed: true }

        case GET_REFRESH_TOKEN_SUCCESS:
            return { ...state, refreshTokenSuccess: true, refreshTokenResponce : action.payload }

        case GET_REFRESH_TOKEN_FAILED:
            return { ...state, refreshTokenSuccess: false }

        default:
            return state;
    }
}