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
export const signUpUser = (firstName,lastName,email,password,phoneNumber,institution) => dispatch => {

    let name=firstName.concat(" ",lastName);

    dispatch({
        type: SIGNUP_FORM_SET_LOADING,
    })

    ApiClient().post('/users/register/', {
        email,
        name, 
        password, 
        phone:phoneNumber,
        institution,
        country_code:"+91"
    })
        .then(response => {

            // dispatch({
            //     type: SIGNUP_FORM_SIGNUP_SUCCESS,
            // })

        }).catch(err => {
            const { statusCode, errorDict } = makeErrorDict(err)

            switch (statusCode) {
                case 421:
                    alert("Please check your internet connection")
                    dispatch({
                        type: SIGNUP_FORM_SIGNUP_SUCCESS,
                    })
                    break
                case 400:
                default:
                    dispatch({
                        type: SINGUP_USER_INPUT_ERROR,
                        payload: errorDict
                    })
                    break
            }

        })
}
