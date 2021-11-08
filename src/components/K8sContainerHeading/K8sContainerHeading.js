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
import Typography from '@mui/material/Typography';
 
const K8sContainerHeading = (props) => {
  return (
    <Box>
      <Typography>pod: {props.podInfo.podName}</Typography>
      <Typography>namespace: {props.podInfo.podNamespace}</Typography>
      <Typography>ip: {props.podInfo.podIp}</Typography>
      <Typography>deployment: {props.podInfo.createdByDeployment}</Typography>
      <Typography>uid: {props.podInfo.uid}</Typography>
    </Box>
  )
}
 
export default K8sContainerHeading;
