import React , {Component} from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import classes from './Auth.css';
import { connect } from 'react-redux';
import {checkValidity} from '../../shared/utility';

class Auth extends Component{
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
        },
        isSignUp:true
    }

    componentDidMount(){
        if(!this.props.burgerBuilding && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath('/')
        }
    }

    inputChangedHandler=(event,controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControls})
    }

    formSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }

    switchAuthHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignUp:!prevState.isSignUp
            }
        })
    }
    render(){
        let formElementArray=[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form=formElementArray.map(formElement=>(
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
        ))
        if(this.props.loading){
            form=<Spinner />
        }
        let errorMessage=null;
        if(this.props.error){
            errorMessage=<p className={classes.errorMessage}>{this.props.error.message}</p>
        }

        let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirectPath} />
        }

        return(
            <div className={classes.AuthData}>
                {authRedirect}
                <form onSubmit={this.formSubmitHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthHandler}>
                    Switch to {this.state.isSignUp?'Sign In':'Sign Up'}
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}

const mapStateToProps=state=>{
    return{
        loading: state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        burgerBuilding:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)