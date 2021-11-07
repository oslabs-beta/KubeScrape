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
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles'; 
 
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PodOverview = (props) => { 

  return (
    <Item sx={{border: '1px solid black'}}>
      <Typography>pod: {props.podName}</Typography>
      <Typography>namespace: {props.namespace}</Typography>
      <Typography>ip: {props.ip}</Typography>
      <Typography>deployment: {props.deployment}</Typography>
      <Typography>uid: {props.uid}</Typography>
    </Item>
  )
}

export default PodOverview;
