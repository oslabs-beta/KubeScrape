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
  // fontSize: '1.5vw',
}));



const PodOverview = (props) => (
  <Container 
    sx={{
      display: 'flex', 
      justifyContent: 'space-between', 
      maxWidth: '350px',     
      ':hover': {
        filter: 'brightness(150%)'
      }
    }}>
    <Paper elevation={10}>
      <List>
        <Detail ><span>pod: {props.podName}</span></Detail>
        <Detail ><span>namespace: {props.namespace}</span></Detail>
        <Detail ><span>ip: {props.ip}</span></Detail>
        <Detail ><span>deployment: {props.deployment}</span></Detail>
        <Detail ><span>uid: {props.uid}</span></Detail>
      </List>
    </Paper>
  </Container>
);

export default PodOverview;
