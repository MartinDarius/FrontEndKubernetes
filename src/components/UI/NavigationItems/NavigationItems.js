import React from 'react';
import { deleteCookie } from '../../../cookieHandler';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Diagram Builder</NavigationItem>
        <NavigationItem link="/configurations" exact>Configurations </NavigationItem>
        <label className={classes.logout} onClick={() => {
            deleteCookie('userSession');
            document.location.reload();
        }}>Log out</label>
    </ul>
);

export default navigationItems;