
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

import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { Switch, Route } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";

import { NodeOverview } from './components/NodeOverview/NodeOverview';
import NodeDetails from './components/NodeDetails/NodeDetails';

const App = () => {
  return(
    <div className='main'>
      <Sidebar/ >

      <Switch>
        <Route path='/' exact>
          <NodeOverview />
        </Route>
        <Route path='/node' exact>
          <NodeDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
