import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICE={
    salad:10,
    bacon:10,
    cheese:20,
    meat:30
}

class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:20,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('https://react-my-burger19.firebaseio.com/ingredients.json')
            .then(response=>{
                this.setState({ingredients:response.data})
            })
            .catch(error=>{
                this.setState({error:true})
            })
    }

    updatePurchaseState=(ingredients)=>{
        const sum=Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0);
            this.setState({purchasable:sum>0});
    }

    addIngredientHandler=(type)=>{
        const updatedCount=this.state.ingredients[type] +1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const updatedPrice=this.state.totalPrice+INGREDIENTS_PRICE[type];
        this.setState({ingredients:updatedIngredients,totalPrice:updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler=(type)=>{
        const updatedCount=this.state.ingredients[type] -1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const updatedPrice=this.state.totalPrice-INGREDIENTS_PRICE[type];
        this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        this.setState({loading:true});
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Aayush',
                address:{
                    street:'XYZ',
                    zipcode:'110059',
                    country:'India'   
                    },
                email:'abc@gmail.com',
                },
            deliveryMethod:'fastest'
        }    
        axios.post('/orders.json',order)
            .then(response=>{
                console.log(response);
                this.setState({loading:false , purchasing:false});
            })
            .catch(err=>{
                console.log(err);
                this.setState({loading:true , purchasing:false });
            });
    }

    render(){
        const disabledInfo={ 
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let burger=this.state.error?<p>Ingredients can't be loaded</p>:<Spinner />
        let orderSummary=null;
        if(this.state.ingredients){
            burger= (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo} 
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                    />
                </Auxiliary>
            );
            orderSummary= 
                    <OrderSummary 
                        ingredients={this.state.ingredients}  
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice}  
                    />
        }
        if(this.state.loading){
            orderSummary=<Spinner />
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

export default withErrorHandler(BurgerBuilder,axios);