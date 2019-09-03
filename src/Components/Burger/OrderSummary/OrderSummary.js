import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'; 
import Button from '../../UI/Button/Button';

const OrderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients)
        .map(igKey=>{
            return (
                <li key={igKey}>
                    <span style={{textTransform:"capitalize"}} >{igKey}</span>:{props.ingredients[igKey]}
                </li>
            );
        });
    return(
        <Auxiliary>
            <h3>Order Summary</h3>
            <p>A delecious Burger on the way with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:Rs.{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>   
            <Button clicked={props.purchaseCancelled} btnType="Danger" >Cancel</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">Continue</Button>         
        </Auxiliary>
    );
}

export default OrderSummary;