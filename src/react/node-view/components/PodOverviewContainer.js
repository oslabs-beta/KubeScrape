/**
 * ************************************
 *
 * @module PodOverviewContainer.js
 * @description Container component that renders overviews of K8s pods
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@mui/material';
import PodOverview from './PodOverview';
import * as actions from '../../../redux/actions/actions';
import * as podPromql from '../../../utils/pod-promql-util';

const PodOverviewContainer = props => {
  // extract state from Redux store
  const { podInfo } = useSelector(state => state.pod);

  // redux hooks
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
      key={`grid${index}`}
      xs={12}
      sm={6}
      justifyContent="center"
      onClick={() => goToPod(pod.podName)}
    >
      <PodOverview
        key={`pod${index}`}
        podName={pod.podName}
        namespace={pod.podNamespace}
        ip={pod.podIp}
        deployment={pod.createdByDeployment}
        uid={pod.uid}
      />
    </Grid>
  ));

  return (
    <Container>
      {/* <Typography variant='h4' align='center' gutterBottom>Click on a pod for more information</Typography> */}
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {podEls}
      </Grid>
    </Container>
  );
};

export default PodOverviewContainer;