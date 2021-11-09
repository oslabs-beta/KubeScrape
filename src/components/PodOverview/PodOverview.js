/**
 * ************************************
 *
 * @module  PodOverview
 * @description Presentational component that renders basic information about a pod
 *
 * ************************************
 */

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles'; 

const FlexItem = styled('span')({

});



const PodOverview = (props) => { 

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
    <Paper variant='outlined' sx={{boxShadow: 20}}>
      <List >
      <ListItem sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.5vw'}} divider={true}><span>pod:</span> <span>{props.podName}</span></ListItem>
      <ListItem sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.5vw'}} divider={true}><span>namespace:</span>  <span>{props.namespace}</span></ListItem>
      <ListItem sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.5vw'}} divider={true}><span>ip:</span>  <span>{props.ip}</span></ListItem>
      <ListItem sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.5vw'}} divider={true}><span>deployment:</span>  <span>{props.deployment}</span></ListItem>
      <ListItem sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.5vw'}} divider={true}><span>uid:</span>  <span>{props.uid}</span></ListItem>
      </List>
    </Paper>
    </Box>
  );
};

export default PodOverview;
