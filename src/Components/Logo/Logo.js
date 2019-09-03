import React from 'react';
import classes from './Logo.css';
import BurgerImg from '../../assets/images/burger-logo.png';

const logo=()=>(
    <div className={classes.Logo}>
        <img src={BurgerImg} alt="MyBurger" />
    </div>
)

export default logo;