/**
 * ************************************
 *
 * @module  PodOverview
 * @description Presentational component that renders basic information about a pod
 *
 * ************************************
 */

import React from 'react';
import { Box, Container } from '@mui/material';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { DirectionsWalk } from '@mui/icons-material';

const Detail = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
}));

const PodOverview = props => (
  <Box
    sx={{
      // display: 'flex',
      // alignItems: 'center',
      wordWrap: 'break-word',
      maxWidth: '350px',
      fontSize: '1rem',
      ':hover': {
        filter: 'brightness(150%)',
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
