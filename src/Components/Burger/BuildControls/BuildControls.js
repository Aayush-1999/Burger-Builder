import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const control=[
    {label:'Salad' , type:'salad'},
    {label:'Bacon' , type:'bacon'},
    {label:'Meat' , type:'meat'},
    {label:'Cheese' , type:'cheese'}
];

const buildControls=(props)=>{
    return(
        <div className={classes.BuildControls}>
            <p>
                Current Price: <strong>{props.price.toFixed(2)}</strong>
            </p>
            {control.map(ctrl=>(
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={()=>props.ingredientAdded(ctrl.type)}
                    removed={()=>props.ingredientRemoved(ctrl.type)} 
                    disable={props.disabled[ctrl.type]}
                 />
            ))}
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
                {props.isAuth?'ORDER NOW':'SIGN UP TO CONTINUE'}
            </button>
        </div>
    )

}

export default buildControls;