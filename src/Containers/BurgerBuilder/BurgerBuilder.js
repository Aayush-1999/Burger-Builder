import React,{Component} from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{
    state={
        purchasing:false
    }

    componentDidMount(){
        if(!this.props.burgerBuilding || this.props.purchased){
            this.props.onInitIngredients();
        }
    }

    updatePurchaseState=(ingredients)=>{
        const sum=Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0);
        return sum>0;
    } 

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth")
        }
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo={ 
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let burger=this.props.error?<p>Ingredients can't be loaded</p>:<Spinner />
        let orderSummary=null;
        if(this.props.ings){
            burger= (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo} 
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                    />
                </Auxiliary>
            );
            orderSummary= 
                    <OrderSummary 
                        ingredients={this.props.ings}  
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        totalPrice={this.props.price}  
                    />
        }

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                {orderSummary}    
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null,
        burgerBuilding:state.burgerBuilder.building,
        purchased:state.order.purchased
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=> dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=> dispatch(actions.initIngredient()),
        onInitPurchase:()=> dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=> dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));