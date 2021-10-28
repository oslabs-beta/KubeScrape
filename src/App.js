
/**
 * ************************************
 *
 * @module App.js
 * @author team KuberG8
 * @date
 * @description Main component for the React app
 * 
 * ************************************
 */

import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { Switch, Route } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";

import { NodeOverview } from './components/NodeOverview/NodeOverview';
import { ClusterOverview } from './components/ClusterOverview/ClusterOverview';

const App = () => {

  return(
    <div className='main'>

      <Sidebar/ >
      
      
      <Switch>
        <Route path='/' exact>
        <ClusterOverview />
        <NodeOverview />
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
