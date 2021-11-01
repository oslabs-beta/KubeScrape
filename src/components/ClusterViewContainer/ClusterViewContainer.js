/**
 * ************************************
 *
 * @module  ClusterViewContainer.js
 * @description component that renders cluster information on home page
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NodeOverview from '../NodeOverview/NodeOverview';
import ClusterOverview from '../ClusterOverview/ClusterOverview';
import * as nodePromql from '../../utils/node-promql-util';
import * as actions from '../../actions/actions';

const primaryColor = '#25274D';

const ClusterViewContainer = () => {
  // hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // extract data from Redux store state
  const { nodeNames } = useSelector((state) => state.node);

  useEffect(async () => {
    const nodeNames = await nodePromql.fetchNodeNamesList();
    // update redux store
    dispatch(actions.setNodeNames(nodeNames));
  }, []);

  const goToNode = (nodeName) => {
    history.push({
      pathname: '/node',
      nodeName: nodeName,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='relative'
        sx={{
          backgroundColor: primaryColor,
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Cluster View
          </Typography>
        </Toolbar>
      </AppBar>

      <ClusterOverview />

      <Container>
        <Typography variant='h6' component='div'>
          Running nodes
          {nodeNames.map((nodeName) => (
            <Container key={nodeName} onClick={() => goToNode(nodeName)}>
              <NodeOverview />
            </Container>
          ))}
        </Typography>
      </Container>
    </Box>
  );
};

export default ClusterViewContainer;
