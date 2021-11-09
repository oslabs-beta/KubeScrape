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
import Visualizer from './components/ClusterOverview/Visualizer';
import K8sContainerViewContainer from './components/K8sContainerViewContainer/K8sContainerViewContainer';
import AlertsOverview from './components/AlertsOverview/AlertsOverview';

const App = () => {
  const history = useHistory();

  // render ClusterView component during initial React App render
  useEffect(() => {
    history.push('/');
  }, []);

  return (
    <div className="main">
      <ThemeProvider theme={theme}>
        <Sidebar />

        <Switch>
          <Route path="/" exact>
            <ClusterViewContainer />
          </Route>

          <Route path="/node" exact>
            <NodeDetailsContainer />
          </Route>

          <Route path="/visualizer" exact>
            <Visualizer />
          </Route>

          <Route path="/pod" exact>
            <K8sContainerViewContainer />
          </Route>

          <Route path="/alerts" exact>
            <AlertsOverview />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
