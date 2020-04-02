import React from 'react';
import classes from './NavigationItems.css';
import Navigationitem from './NavigationItem/NavigationItem';

const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <Navigationitem link="/" exact >Burger Builder</Navigationitem>
        {props.isAuthenticated?<Navigationitem link="/orders" >Orders</Navigationitem>:null}
        { !props.isAuthenticated?
            <Navigationitem link="/auth" exact >Authenticate</Navigationitem>
            :<Navigationitem link="/logout" exact >Logout</Navigationitem>
        }
    </ul>
)

export default navigationItems;