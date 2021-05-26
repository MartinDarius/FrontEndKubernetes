import React from 'react';
import DiagramBuilder from './DiagramBuilder';
import {Route, Switch} from 'react-router-dom';
import Toolbar from './components/UI/Toolbar/Toolbar';
import MyConfigurations from './myConfigurations/MyConfigurations';

class App extends React.Component{
    render(){
        return(
            
            <Toolbar>
            <Switch>
             <Route path="/configurations" component={MyConfigurations}/>
             <Route path="/" exact component={DiagramBuilder}/> 
            </Switch>
            </Toolbar>
    

        )
    }
}

export default App;