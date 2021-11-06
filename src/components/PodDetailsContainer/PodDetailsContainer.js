/**
 * ************************************
 *
 * @module PodDetailsContainer.js
 * @description Component to render details of each individual K8s Pod
 * 
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { theme } from '../../theme';
import { useTheme } from '@mui/material/styles';
import PodOverview from '../PodOverview/PodOverview';
import K8sContainerHeading from '../K8sContainerHeading/K8sContainerHeading';
import * as actions from '../../actions/actions';
import * as podPromql from '../../utils/pod-promql-util';
 
const primaryColor = '#25274D';
 
const PodDetailsContainer = (props) => {
   
  //useSelector allows you to extract data from the Redux store state, using a selector function
  //this function accesses the state from the nodeReducer by subscribing to the store through sseSelector
  const { podNames, podInfo } = useSelector(state => state.pod);
  const [ podName, setPodName ] = useState('');


  //the useDispatch hook returns a reference to the dispatch function from the Redux store.
  //dispatch can now be used to dispatch actions as needed
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  useEffect(async () => {
    const podNamesList = await podPromql.fetchPodNamesList(props.node);
    const podInfoList = await podPromql.fetchPodInfoList(props.node);
    dispatch(actions.setPodNames(podNamesList));
    dispatch(actions.setPodInfo(podInfoList));
    }, []);

  //TODO: Fix goToPod so it redirects to the correct pod and top of the page in K8sContainerOverview when a PodOverview is clicked
  const goToPod = (podName) => {
    history.push({
      pathname:'/pod',
      podName: podName
    })
  }

    const podEls = podInfo.map((pod, index) => {
      return (
      <Grid item container xs={12} sm={4} key={'index: ' + index } onClick={() => goToPod(pod.podName)}
      >
      <PodOverview
        key={'pod' + index} 
        podName={pod.podName}
        namespace={pod.podNamespace}
        ip={pod.podIp}
        deployment={pod.createdByDeployment}
        uid={pod.uid}
      />
      </Grid>
      )
    });

    // Appbar uses display:flex + flex-direction: column
    // while Toolbar uses display:flex with default flex-direction: row to display items inline
    return(
      <Box >
        <AppBar position='relative' sx={{
          backgroundColor: primaryColor,
          width: '100%',
          marginBottom: '20px'
        }}>
        </AppBar>
        <Grid container spacing={2} direction="column" alignItems="center">
          {podEls}
        </Grid>
      </Box>
    )
}
 
 export default PodDetailsContainer;
