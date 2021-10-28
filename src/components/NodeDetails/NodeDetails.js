import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const primaryColor = '#25274D';

const NodeDetails = () => {
  
  const [nodeName, setNode] = useState('');
  
  const handleChange = event => {
    setNode(event.target.value);
  }

  // Appbar uses display:flex + flex-direction: column
  // while Toolbar uses display:flex with default flex-direction: row to display items inline
  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="inherit" sx={{
        backgroundColor: primaryColor,
        width: '100%',
        marginBottom: '20px'
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Node Details
          </Typography>

          <FormControl variant='filled' 
            sx={{ minWidth: 200, 
                  padding: 0,
                  border: '1px solid white',
                  borderRadius: '5px',
            }}>
            <InputLabel sx={{ color: 'white' }}>View Node</InputLabel>
            <Select sx={{ color: 'white' }} value={nodeName} onChange={handleChange}>
              <MenuItem value='Node 1'>Node 1</MenuItem>
              <MenuItem value='Node 2'>Node 2</MenuItem>
              <MenuItem value='Node 3'>Node 3</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      {nodeName}
    </Box>
  )
}

export default NodeDetails;