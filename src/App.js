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
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './theme';
import ClusterViewContainer from './components/ClusterViewContainer/ClusterViewContainer';
import NodeDetailsContainer from './components/NodeDetailsContainer/NodeDetailsContainer';
import PodViewContainer from './components/PodViewContainer/PodViewContainer';

const App = () => {
  const history = useHistory();

  // render ClusterView component during initial React App render
  useEffect(() => {
    history.push('/');
  }, []);

  return (
    <div className='main'>
      <ThemeProvider theme={theme}>
        <Sidebar />

        <Switch>
          <Route path='/' exact>
            <ClusterViewContainer />
          </Route>

          <Route path='/node' exact>
            <NodeDetailsContainer />
          </Route>

          <Route path='/pod' exact>
            <PodViewContainer />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
