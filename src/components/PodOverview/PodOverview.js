/**
 * ************************************
 *
 * @module  PodOverview
 * @description Presentational component that renders basic information about a pod
 *
 * ************************************
 */

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
 
//create a functional component
export const PodOverview = (props) => { 

  return (
    <Box sx={{
      border: '1px solid black',
      minWidth: 300,
      maxWidth: '45%',
      }}
    >        
      <Typography>pod: {props.podName}</Typography>
      <Typography>namespace: {props.namespace}</Typography>
      <Typography>ip: {props.ip}</Typography>
      <Typography>deployment: {props.deployment}</Typography>
      <Typography>uid: {props.uid}</Typography>

    </Box>
  )
}

export default PodOverview;
