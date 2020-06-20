import ApiClient from '../utils/ApiClient'
import CustomHistory from '../utils/CustomHistory'
import { storeToken, eraseToken } from '../utils/Token'
import { makeErrorDict } from '../utils/APIUtils'


// actions types
export const SIGNUP_USER_SPECIAL_ERROR = 'SIGNUP_USER_SPECIAL_ERROR'
export const SINGUP_USER_INPUT_ERROR = 'SINGUP_USER_INPUT_ERROR'
export const SIGNUP_FORM_SET_LOADING = 'SIGNUP_FORM_SET_LOADING'
export const SIGNUP_FORM_SIGNUP_SUCCESS = 'SIGNUP_FORM_SIGNUP_SUCCESS'


// reducer
const initialState = {
    loading: false,
    success:false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SINGUP_USER_INPUT_ERROR:
            return {
                ...initialState,
                error: action.payload,
            }
        case SIGNUP_FORM_SET_LOADING:
            return {
                ...initialState,
                loading: true
            }
        case SIGNUP_USER_SPECIAL_ERROR:
            return {
                ...initialState,
                error: action.payload
            }
        case SIGNUP_FORM_SIGNUP_SUCCESS:
            return{
                ...initialState,
                success:true
            }
        default:
            return state
    }
}


// actions
export const signUpUser = (fname,lname,email,password,phone) => dispatch => {

    let name=fname.concat(" ",lname);

    dispatch({
        type: LOGIN_FORM_SET_LOADING,
    })

    ApiClient().post('/users/register/', {
        email, name, password, phone
    })
        .then(response => {

            dispatch({
                type: SIGNUP_FORM_SIGNUP_SUCCESS,
            })

        }).catch(err => {
            const { statusCode, errorDict } = makeErrorDict(err)

            switch (statusCode) {
                case 421:
                    alert("Please check your internet connection")
                    dispatch({
                        type: LOGIN_FORM_LOGIN_SUCCESS,
                    })
                    break
                case 401:
                case 404:
                    dispatch({
                        type: LOGIN_USER_SPECIAL_ERROR,
                        payload: errorDict['detail']
                    })
                    break
                case 400:
                default:
                    dispatch({
                        type: LOGIN_USER_INPUT_ERROR,
                        payload: errorDict
                    })
                    break
            }

        })
}

export const logoutUser = () => dispatch => {
    eraseToken()
    dispatch({
        type: LOGOUT_USER
    })
    CustomHistory.push('/login/')
}