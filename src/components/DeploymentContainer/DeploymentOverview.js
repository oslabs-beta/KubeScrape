/**
 * ************************************
 *
 * @module DeploymentOverview.js
 * @description renders deployment information from the prometheus server
 *
 * ************************************
 */

import React from 'react';
import { Box, Paper } from '@mui/material';

const primaryColor = '#25274D';

const DeploymentOverview = props => (
  <Paper
    elevation={5}
    sx={{
      backgroundColor: primaryColor,
      maxWidth: '20%',
      fontSize: '0.75rem',
      borderRadius: '5px',
      padding: '5px 15px',
      margin: '10px',
      wordWrap: 'break-word',
    }}
  >
    <Box>
      <p>Deployment: {props.deployment}</p>
      <p>Instance: {props.instance}</p>
      <p>Job: {props.job}</p>
      <p>Namespace: {props.namespace}</p>
      <p>Created On: {props.createdOnDate}</p>
    </Box>
  </Paper>
);

export default DeploymentOverview;
