/**
 * ************************************
 *
 * @module  PodOverview.js
 * @description Presentational component that renders basic information about a pod
 *
 * ************************************
 */

import React from 'react';
import { Box, List, ListItem, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Detail = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
}));

const PodOverview = props => (
  <Box
    sx={{
      wordWrap: 'break-word',
      maxWidth: '350px',
      fontSize: '1rem',
      ':hover': {
        filter: 'brightness(150%)',
        cursor: 'pointer',
      },
    }}
  >
    <Paper elevation={5} sx={{ display: 'flex', alignItems: 'center', height: '200px' }}>
      <List>
        <Detail>
          <span>Pod: {props.podName}</span>
        </Detail>
        <Detail>
          <span>Namespace: {props.namespace}</span>
        </Detail>
        <Detail>
          <span>IP: {props.ip}</span>
        </Detail>
        <Detail>
          <span>Deployment: {props.deployment}</span>
        </Detail>
        <Detail>
          <span>UID: {props.uid}</span>
        </Detail>
      </List>
    </Paper>
  </Box>
);

export default PodOverview;