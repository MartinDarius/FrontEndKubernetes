import React from 'react';
import DiagramBuilder from './DiagramBuilder';
import {Route, Switch} from 'react-router-dom';
import Toolbar from './components/UI/Toolbar/Toolbar'

class App extends React.Component{
    render(){
        return(
            
            <Toolbar>
            <Switch>
             <Route path="/" component={DiagramBuilder}/>
            </Switch>
            </Toolbar>
    

        )
    }
}

export default App;