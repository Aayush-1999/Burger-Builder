import React from 'react';
import classes from './NavigationItems.css';
import Navigationitem from './NavigationItem/NavigationItem';

const navigationItems=()=>(
    <ul className={classes.NavigationItems}>
        <Navigationitem link="/" exact >Burger Builder</Navigationitem>
        <Navigationitem link="/orders" >Orders</Navigationitem>
    </ul>
)

export default navigationItems;