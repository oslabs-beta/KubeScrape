/**
 * ************************************
 *
 * @module K8sContainerHeading.js
 * @description Presentational component to render details of each individual K8s Pod at the top of the view that focuses on container-level metrics
 * 
 * ************************************
 */

import React from 'react';
import Box from '@mui/material/Box';
import {List, ListItem, Paper } from '@mui/material'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system'; 

const Detail = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '1.5vw',
  divider: true
}));
 
const K8sContainerHeading = (props) => {
  return (
    <Box>
      <Paper variant='outlined' sx={{boxShadow: 10}}>
      <List>
      <Detail>pod: {props.podInfo.podName}</Detail>
      <Detail>namespace: {props.podInfo.podNamespace}</Detail>
      <Detail>ip: {props.podInfo.podIp}</Detail>
      <Detail>deployment: {props.podInfo.createdByDeployment}</Detail>
      <Detail>uid: {props.podInfo.uid}</Detail>
      </List>
      </Paper>
    </Box>
  )
}
 
export default K8sContainerHeading;
