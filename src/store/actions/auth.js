import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,id)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:id
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error 
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime*1000); 
    } 
}

export const logout=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const auth=(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtCX8SPXKOfVAJ7TFGXK_89TxqmCZQfkI'
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtCX8SPXKOfVAJ7TFGXK_89TxqmCZQfkI'
        }
        axios.post(url,authData)
        .then(response=>{
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath=(path=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
})