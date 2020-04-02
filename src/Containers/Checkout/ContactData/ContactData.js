import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },   
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'Fastest',
                validation:{},
                valid:true
            }
        },
        formIsValid:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        const formData={};
        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value;
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData
        }
        this.props.onOrderBurger(order,this.props.token);
       
    }

    checkValidity=(value,rules)=>{
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid=(value.length>=rules.minLength && isValid);
        }
        if(rules.maxLength){
            isValid=(value.length<=rules.maxLength && isValid);
        }
        if(rules.isEmail){
            const pattern=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid=pattern.test(value) && isValid    
        }
        if(rules.isNumeric){
            const pattern=/^\d+$/;
            isValid=pattern.test(value)  && isValid 
        }
        return isValid;
    }

    inputChangedHandler=(event,key)=>{
        const updatedOrderForm={...this.state.orderForm};
        const updatedOrderFormElement={...updatedOrderForm[key]};
        updatedOrderFormElement.value=event.target.value;
        updatedOrderFormElement.valid=this.checkValidity(updatedOrderFormElement.value,updatedOrderFormElement.validation);
        updatedOrderFormElement.touched=true;
        updatedOrderForm[key]=updatedOrderFormElement;
        
        let formIsValid=true;
        for(let key in updatedOrderForm){
            formIsValid=updatedOrderForm[key].valid && formIsValid;
        }

        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }

    render(){
        let formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement=>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                ))}
                <Button btnType='Success' disable={!this.state.formIsValid} >ORDER</Button>
            </form>
        )
        if(this.props.loading){
            form=<Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token
    }
};

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token)) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));