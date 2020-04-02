import React,{Component} from 'react';
import classes from './Layout.css';
import {connect} from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer:false
    };

    sideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    drawerToggleClickedHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:!prevState.showSideDrawer}
        });
    }

    render(){
        return(
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuthenticated} DrawerToggleClicked={this.drawerToggleClickedHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout);