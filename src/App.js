/**
 * ************************************
 *
 * @module App.js
 * @description Main component for the React app
 * 
 * ************************************
 */

import React, { useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { Switch, Route, useHistory } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';

import ClusterView from './components/ClusterView/ClusterView';
import NodeDetails from './components/NodeDetails/NodeDetails';

const App = () => {
  const history = useHistory();

  // render ClusterView component during initial React App render
  useEffect( () => {
    history.push('/');
  }, []);

  return(
    <div className='main'>
      <Sidebar/ >

      <Switch>
        <Route path='/' exact>
          <ClusterView />
        </Route>
        <Route path='/node' exact>
          <NodeDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
