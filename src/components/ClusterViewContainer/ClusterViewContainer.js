/**
 * ************************************
 *
 * @module  ClusterView.js
 * @description component that renders cluster information on home page
 *
 * ************************************
 */

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NodeOverview from '../NodeOverview/NodeOverview';
import ClusterOverview from '../ClusterOverview/ClusterOverview';

const primaryColor = '#25274D';

const ClusterViewContainer = () => {

  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative' sx={{
        backgroundColor: primaryColor,
        width: '100%',
        marginBottom: '20px'
      }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Cluster View
          </Typography>
        </Toolbar>
      </AppBar>
      
      <ClusterOverview />
      <NodeOverview />
      

    </Box>  
  );
}

export default ClusterViewContainer;