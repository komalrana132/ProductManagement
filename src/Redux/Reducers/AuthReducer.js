import {
  TEST_ENCRYPTION_SUCCESS,
  TEST_ENCRYPTION_FAILED,
  RESET_AUTH,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILURE,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILURE,
} from '../Types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEST_ENCRYPTION_SUCCESS:
      return {
        ...state,
        testEncryptionSuccess: true,
        testEncryptionResponse: action.payload,
      };

    case TEST_ENCRYPTION_FAILED:
      return {...state, testEncryptionSuccess: false, error: action.payload};

    case GET_LOGIN_SUCCESS:
      return {...state, loginSuccess: true, loginResponse: action.payload, userDetail : action.payload};

    case GET_LOGIN_FAILURE:
      return {...state, loginSuccess: false, error: action.payload};

      case GET_REGISTER_SUCCESS:
        return {...state, registerSuccess: true, registerResponse: action.payload};
  
      case GET_REGISTER_FAILURE:
        return {...state, registerSuccess: false, error: action.payload};

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileSuccess: true,
        updateProfileResponce: action.payload,
        // checking it for the status cause if fails then all the user data will be gone
        userData: action.payload.Status === 1 ? action.payload : state.userData,
      };

    case UPDATE_PROFILE_FAILURE:
      return {...state, updateProfileSuccess: false, error: action.payload};

    case RESET_AUTH:
      return {...INITIAL_STATE};

    default:
      return state;
  }
};
