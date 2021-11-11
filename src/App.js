/**
 * ************************************
 *
 * @module App.js
 * @description Main component for the React app
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './react/sidebar/Sidebar';

import theme from './theme';
import HomeContainer from './react/home-view/HomeContainer';
import NodeContainer from './react/node-view/NodeContainer';
import Visualizer from './react/visualizer/VisualizerContainer';
import PodContainer from './react/pod-view/PodContainer';
import AlertsOverview from './react/alerts-view/AlertsOverview';

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
            <HomeContainer />
          </Route>

          <Route path="/node" exact>
            <NodeContainer />
          </Route>

          <Route path="/pod" exact>
            <PodContainer />
          </Route>

          <Route path="/alerts" exact>
            <AlertsOverview />
          </Route>

          <Route path="/visualizer" exact>
            <Visualizer />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
