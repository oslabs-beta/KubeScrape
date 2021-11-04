import React from 'react';
import { 
  Box, AppBar, Toolbar,
  Typography
} from '@mui/material';

const primaryColor='#25274D';

const Visualizer = () => {
  return(
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position='relative' sx={{
      backgroundColor: primaryColor,
      width: '100%',
      marginBottom: '20px'
    }}>
      <Toolbar>
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
          Visualizer
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Visualizer;