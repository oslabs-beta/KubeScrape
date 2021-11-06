/**
 * ************************************
 *
 * @module  PodOverview
 * @description Presentational component that renders basic information about a pod
 *
 * ************************************
 */

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
 
//create a functional component
export const PodOverview = (props) => { 

  return (
    <Grid sx={{border: '1px solid black'}}>
      <Typography>pod: {props.podName}</Typography>
      <Typography>namespace: {props.namespace}</Typography>
      <Typography>ip: {props.ip}</Typography>
      <Typography>deployment: {props.deployment}</Typography>
      <Typography>uid: {props.uid}</Typography>
    </Grid>
  )
}

export default PodOverview;
