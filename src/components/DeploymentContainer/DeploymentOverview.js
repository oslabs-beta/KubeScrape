/**
 * ************************************
 *
 * @module DeploymentOverview.js
 * @description renders deployment information from the prometheus server
 *
 * ************************************
 */

import React from 'react';
import { Box, Grid } from '@mui/material';

const primaryColor = '#25274D';

const DeploymentOverview = props => {
  return (
    <Box
      sx={{
        backgroundColor: primaryColor,
        // resize: 'both',
        // minWidth: '15%',
        maxWidth: '20%',
        fontSize: '0.75rem',
        borderRadius: '5px',
        padding: '5px 15px',
        margin: '10px',
        wordWrap: 'break-word',
      }}
    >
      <p>Deployment: {props.deployment}</p>
      <p>Instance: {props.instance}</p>
      <p>Job: {props.job}</p>
      <p>Namespace: {props.namespace}</p>
      <p>Created On: {props.createdOnDate}</p>
    </Box>
  );
};

export default DeploymentOverview;
