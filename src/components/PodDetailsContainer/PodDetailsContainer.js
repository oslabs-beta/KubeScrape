/**
 * ************************************
 *
 * @module PodDetailsContainer.js
 * @description Component to render details of each individual K8s Pod
 * 
 * ************************************
 */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar, Box, Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PodOverview from '../PodOverview/PodOverview';
import * as actions from '../../actions/actions';
import * as podPromql from '../../utils/pod-promql-util';
 
const primaryColor = '#25274D';
 
const PodDetailsContainer = (props) => {
   
  // useSelector allows you to extract data from the Redux store state, using a selector function
  // this function accesses the state from the nodeReducer by subscribing to the store through sseSelector
  const { podInfo } = useSelector(state => state.pod);

  // the useDispatch hook returns a reference to the dispatch function from the Redux store.
  // dispatch can now be used to dispatch actions as needed
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(async () => {
    const podNamesList = await podPromql.fetchPodNamesList(props.node);
    const podInfoList = await podPromql.fetchPodInfoList(props.node);
    dispatch(actions.setPodNames(podNamesList));
    dispatch(actions.setPodInfo(podInfoList));
    }, []);

  // TODO: Fix goToPod so it redirects to the correct pod and top of the page in K8sContainerOverview when a PodOverview is clicked
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
