import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.css'

const toolbar = (props) => (
    <div className="ceva">
    <header className="Toolbar">
     <div className="Logo">
            <Logo />
    </div>
    <nav className="nav">
            <NavigationItems />
    </nav>
    </header>
    <main className="Content">
        {props.children}
    </main>
    </div>
);

export default toolbar;