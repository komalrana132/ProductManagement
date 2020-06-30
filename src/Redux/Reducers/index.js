import AuthReducer from './AuthReducer';
import CommonReducer from './CommonReducer';
import HomeReducer from './HomeReducer';
import LogoutReducer from './LogoutReducer';


let rootReducer = {
    Auth: AuthReducer,
    Logout: LogoutReducer,
    Home: HomeReducer,
    Common: CommonReducer
};
export default rootReducer