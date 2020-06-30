import {
    LOGOUT_REQUEST
} from '../Types'

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    console.log('*****************REDUCER')
    switch (action.type) {

        case LOGOUT_REQUEST:
            return { ...state, logoutSuccess: true };

        default:
            return state;
    }
}