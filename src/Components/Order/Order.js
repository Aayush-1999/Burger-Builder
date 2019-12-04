import React from 'react';
import classes from './Order.css';

const Order=(props)=>{
    let ingredients=[];

    for(let ingredientname in props.ingredients){
        ingredients.push( {
            name : ingredientname,
            amount: props.ingredients[ingredientname]
        })
    }

    const ingredientOutput=ingredients.map(ig=>{
        return <span key={ig.name} 
                    style={{
                        textTransform:'capitalize',
                        padding:'5px',
                        margin : '0 8px',
                        display:'inline-block',
                        border: '1px solid #ccc'
                    }} >
                            {ig.name} ({ig.amount})  
                </span>
    })

    return(
        <div className={classes.Order}>
            <p>Ingredient : {ingredientOutput}</p>
            <p>Price : <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;