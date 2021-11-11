/**
 * ************************************
 *
 * @module NodeContainer.js
 * @description Container component that renders K8s nodes
 *
 * ************************************
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
  AppBar, Container, Toolbar,
  Typography, FormControl, Select,
  MenuItem, InputLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PodDetailsContainer from './components/PodsContainer';

const NodeContainer = () => {

  // get custom theme object
  const theme = useTheme();

  // returns a location object that represents the current URL
  const location = useLocation();

  // get nodeNames from Redux store
  const { nodes } = useSelector(state => state.cluster);

  // keep track of current node
  // if nodeName url param is not provided, set default node to first node in the list
  const [currentNode, setCurrentNode] = useState(location.nodeName || nodes[0]);

  const handleChange = event => {
    setCurrentNode(event.target.value);
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Node Details
          </Typography>

          <FormControl
            variant="filled"
            sx={{ minWidth: 200, padding: 0, border: '1px solid white', borderRadius: '5px' }}
          >
            <InputLabel sx={{ color: 'white' }}>View Node</InputLabel>
            <Select sx={{ color: 'white' }} value={currentNode} onChange={handleChange}>
              {nodes.map(node => (
                <MenuItem key={node} value={node}>
                  {node}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <PodDetailsContainer node={currentNode} />

    </Container>
  );
};

export default NodeContainer;
