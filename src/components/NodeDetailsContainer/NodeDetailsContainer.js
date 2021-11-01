/**
 * ************************************
 *
 * @module NodeDetailsContainer.js
 * @description Component to render details of each individual K8s Node
 *
 * ************************************
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const primaryColor = '#25274D';

const NodeDetailsContainer = () => {
  // get nodeNames from Redux store
  const { nodeNames } = useSelector((state) => state.node);

  // keep track of current node
  // set first node in node names list as default if defined
  const [currentNode, setCurrentNode] = useState(nodeNames[0] || '');

  const handleChange = (event) => {
    // set current node
    setCurrentNode(event.target.value);
  };

  console.log(`current node is ${currentNode}`);

  // Appbar uses display:flex + flex-direction: column
  // while Toolbar uses display:flex with default flex-direction: row to display items inline
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
            Node Details
          </Typography>

          <FormControl
            variant='filled'
            sx={{
              minWidth: 200,
              padding: 0,
              border: '1px solid white',
              borderRadius: '5px',
            }}
          >
            <InputLabel sx={{ color: 'white' }}>View Node</InputLabel>
            <Select
              sx={{ color: 'white' }}
              value={currentNode}
              onChange={handleChange}
            >
              {nodeNames.map((nodeName) => (
                <MenuItem key={nodeName} value={nodeName}>
                  {nodeName}
                </MenuItem>
              ))}
              {/* test dropdown item */}
              <MenuItem value={'minikube-node'}>{'minikube-node'}</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NodeDetailsContainer;
