/**
 * ************************************
 *
 * @module  ClusterViewContainer.js
 * @description component that renders cluster information on home page
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AppBar, Box, Toolbar,
  Container, Typography
} from '@mui/material';
import NodeOverview from '../NodeOverview/NodeOverview';
import ClusterOverview from '../ClusterOverview/ClusterOverview';
import * as nodePromql from '../../utils/node-promql-util';
import * as actions from '../../actions/actions';

const primaryColor = '#25274D';

const ClusterViewContainer = () => {
  // hooks
  const dispatch = useDispatch();

  // extract data from Redux store state
  const { nodeNames } = useSelector(state => state.node);

  useEffect( async () => {
    const nodeNames = await nodePromql.fetchNodeNamesList();
    // update redux store
    dispatch(actions.setNodeNames(nodeNames));  
  }, []);
  
  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative' sx={{
        backgroundColor: primaryColor,
        width: '100%',
        marginBottom: '20px'
      }}>
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            Cluster View 
          </Typography>
        </Toolbar>
      </AppBar>
      
      <ClusterOverview />
      
      <Container>
        <Typography variant='h6' component='div' sx={{ 
          backgroundColor: primaryColor,
          display: 'box-sizing',
          padding: '10px 25px',
          borderRadius: '5px',
          margin: '20px', 
          flexGrow: 1 }}>
            Running Nodes
        </Typography>
        
        <Container sx={{ display: 'flex' }}> 
          {nodeNames.map(nodeName => 
            <NodeOverview key={nodeName} nodeName={nodeName}/>
          )}
        </Container>

      </Container>
    </Box>  
  );
}

export default ClusterViewContainer;