import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import classes from './ContactData.css';

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading:true});
        const order={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
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
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(err=>{
                console.log(err);
                this.setState({loading:true});
            });
    }

    render(){
        let form=(
            <form>
                    <input className={classes.Input}  type='text' name='name' placeholder='your name' />
                    <input className={classes.Input} type='email' name='email' placeholder='your email' />
                    <input className={classes.Input} type='text' name='street' placeholder='Street' />
                    <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if(this.state.loading){
            form=<Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;