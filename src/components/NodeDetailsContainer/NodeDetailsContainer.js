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
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import PodDetailsContainer from '../PodDetailsContainer/PodDetailsContainer';

const primaryColor = '#25274D';

const NodeDetailsContainer = () => {
  // returns a location object that represents the current URL
  const location = useLocation();

  // get nodeNames from Redux store
  const { nodes } = useSelector(state => state.cluster);

  // keep track of current node
  // if nodeName url param is not provided, set default node to first node in the list 
  const [ currentNode, setCurrentNode ] = useState(location.nodeName || nodes[0]);

  const handleChange = (event) => {
    setCurrentNode(event.target.value);
  };

  // Appbar uses display:flex + flex-direction: column
  // while Toolbar uses display:flex with default flex-direction: row to display items inline
  return(
    <Container sx={{flexGrow: 1}}>
      <AppBar position='relative' sx={{
        backgroundColor: primaryColor,
        width: '100%',
        marginBottom: '20px'
      }}>
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            Node Details
          </Typography>

          <FormControl variant='filled' 
            sx={{ minWidth: 200, 
              padding: 0,
              border: '1px solid white',
              borderRadius: '5px',
            }}>
            <InputLabel sx={{ color: 'white' }}>View Node</InputLabel>
            <Select sx={{ color: 'white' }} value={currentNode} onChange={handleChange}>
              {nodes.map(node => 
                <MenuItem key={node} value={node}>{node}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <PodDetailsContainer node={currentNode}/>
    </Container>
  );
};

export default NodeDetailsContainer;
