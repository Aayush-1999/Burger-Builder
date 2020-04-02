import * as actionTypes from '../actions/actionTypes';

const initialStore={
    token:null,
    userId:null,
    loading:false,
    error:null,
    authRedirectPath:'/'
}

const reducer=(state=initialStore,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null,
                userId:action.userId,
                token:action.token
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                userId:null,
                token:null
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath:action.path
            }
        default: return state;
    }
}

export default reducer;