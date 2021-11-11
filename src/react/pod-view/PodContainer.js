/**
 * ************************************
 *
 * @module PodContainer.js
 * @description Container component which renders information about a k8s pod and displays line charts of K8s containers metrics 
 *
 * ************************************
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AppBar, Box, Toolbar, 
  Typography, FormControl, Select,
  MenuItem, InputLabel 
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; 
import * as containerPromql from '../../utils/container-promql-util';
import * as podPromql from '../../utils/pod-promql-util';
import ContainersGraphContainer from './components/ContainersGraphContainer';
import PodHeader from './components/PodHeader';
import * as actions from '../../redux/actions/actions';

const PodContainer = props => {

  // get custom theme object
  const theme = useTheme();
  
  // access podInfo state from store, and set allContainers state
  const { podInfo } = useSelector(state => state.pod);
  const { nodes } = useSelector(state => state.cluster);
  const [allContainers, setAllContainers] = useState([]);

  // keep track of current pod
  // set first pod in pod names list as default if it's defined
  const [currentPodInfo, setCurrentPodInfo] = useState(podInfo[0] || []);

  const dispatch = useDispatch();

  // get array of pod names from prometheus server and use the array to update state
  // get all cluster's containers using fetch request and update state
  useEffect(async () => {
    const podInfoArray = await podPromql.fetchPodInfoList(nodes[0]);
    const allContainers = await containerPromql.fetchContainerNames();
    dispatch(actions.setPodInfo(podInfoArray));
    setAllContainers(allContainers);
  }, []);

  // get info on the user-selected pod and update state
  const handleChange = async event => {
    const currentPodInfo = await podPromql.fetchCurrentPodInfo(event.target.value);
    setCurrentPodInfo(currentPodInfo);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pod Details
          </Typography>
          <FormControl
            variant="filled"
            sx={{ minWidth: 200, padding: 0, border: '1px solid white', borderRadius: '5px' }}
          >
            <InputLabel sx={{ color: 'white' }}>Current Pod</InputLabel>

            <Select sx={{ color: 'white' }} value={currentPodInfo.podName} onChange={handleChange}>
              {podInfo.map(pod => (
                <MenuItem key={pod.podName} value={pod.podName}>
                  {pod.podName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <PodHeader podInfo={currentPodInfo} />

      <ContainersGraphContainer podInfo={currentPodInfo} allContainers={allContainers} />
    </Box>
  );
};

export default PodContainer;