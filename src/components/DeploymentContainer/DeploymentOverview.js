/**
 * ************************************
 *
 * @module DeploymentOverview.js
 * @description renders deployment information from the prometheus server
 *
 * ************************************
 */

import React from 'react';
import { Box } from '@mui/material';

 const primaryColor='#25274D';

 const DeploymentOverview = (props) => {
    return(
      <Box sx={{
        backgroundColor: primaryColor,
        maxWidth: '15%',
        fontSize: '0.75rem',
        borderRadius: '5px',
        padding: '5px 15px',
        margin: '10px'

      }}>
        <p>Instance: {props.instance}</p>
        <p>Job: {props.job}</p>
        <p>Namespace: {props.namespace}</p>
        <p>Created on: {props.createdOnDate}</p>
      </Box>
    )
 }

 export default DeploymentOverview;