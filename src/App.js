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

import ClusterViewContainer from './components/ClusterViewContainer/ClusterViewContainer';
import NodeDetailsContainer from './components/NodeDetailsContainer/NodeDetailsContainer';
import Deployments from './components/Deployments/deployments';

const App = () => {
  const history = useHistory();

  // render ClusterView component during initial React App render
  useEffect(() => {
    history.push('/');
  }, []);

  return (
    <div className='main'>
      <Sidebar />

      <Switch>
        <Route path='/' exact>
          <ClusterViewContainer />
        </Route>

        <Route path='/node' exact>
          <NodeDetailsContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
