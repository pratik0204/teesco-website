import { combineReducers } from 'redux';
import LoginReducer from '../actions/LoginActions'
import SignUpReducer from '../actions/SignupActions'


export default combineReducers({
    login: LoginReducer,
    signup:SignUpReducer
})