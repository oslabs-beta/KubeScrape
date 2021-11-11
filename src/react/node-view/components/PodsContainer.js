/**
 * ************************************
 *
 * @module PodsContainer.js
 * @description Container component which renders K8s pods
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@mui/material';
import PodOverview from './PodOverview';
import * as actions from '../../../actions/actions';
import * as podPromql from '../../../utils/pod-promql-util';

const PodsContainer = props => {
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
  const goToPod = podName => {
    history.push({
      pathname: '/pod',
      podName,
    });
  };

  const podEls = podInfo.map((pod, index) => (
    <Grid
      item
      container
      key={'index: ' + index}
      xs={12}
      sm={6}
      justifyContent="center"
      onClick={() => goToPod(pod.podName)}
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
  ));

  // Appbar uses display:flex + flex-direction: column
  // while Toolbar uses display:flex with default flex-direction: row to display items inline
  return (
    <Container>
      {/* <Typography variant='h4' align='center' gutterBottom>Click on a pod for more information</Typography> */}
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {podEls}
      </Grid>
    </Container>
  );
};

export default PodsContainer;
