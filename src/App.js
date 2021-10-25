import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { Switch, Route } from 'react-router-dom';
const App = () => {

  return(
    <div className='main'>

      <Sidebar/ >
      
      <Switch>
        <Route path='/' exact>
          home
        </Route>
        <Route path='/node' exact>
          node
        </Route>
      </Switch>
      

    </div>
  );
}

export default App;