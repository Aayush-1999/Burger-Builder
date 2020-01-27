import * as actionTypes from '../actions/actionTypes';

const initialStore={
    ingredients:null,
    error:false,
    totalPrice:20
};

const INGREDIENTS_PRICE={
    salad:10,
    bacon:10,
    cheese:20,
    meat:30
}

const reducer=(state=initialStore,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENT:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false
            };
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return{
                ...state,
                error:true
            };
        default: return state;
    }
};

export default reducer;