/**
 * ************************************
 *
 * @module PodViewContainer.js
 * @description Component to get information about each container in the current pod, and pass that information to graph components render details of a single K8s pod
 * 
 * ************************************
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import * as containerPromql from '../../utils/container-promql-util';
import * as podPromql from '../../utils/pod-promql-util';
import K8sContainersOverview from '../K8sContainersOverview/K8sContainersOverview';
import K8sContainerHeading from '../K8sContainerHeading/K8sContainerHeading';
import * as actions from '../../actions/actions'

const primaryColor = '#25274D';
 

const K8sContainerViewContainer = (props) => {

  //access podNames state from store, and set allContainerNamesList state
  const { podInfo } = useSelector(state => state.pod);
  const { nodeNames } = useSelector(state => state.node);
  const [ allContainerNamesList, setAllContainerNamesList ] = useState([]);
  // keep track of current pod
  // set first pod in pod names list as default if defined
  const [ currentPod, setCurrentPod ] = useState(podInfo[0].podName || 'no pod selected');

  //**START HERE **/
  const [ currentPodInfo, setCurrentPodInfo ] = useState(podInfo[0] || []);

  const dispatch = useDispatch();
  //get array of pod names from prometheus server and use the array to update state
  //get all cluster's containers using fetch request and update state
  useEffect(async () => {
    const podInfoList = await podPromql.fetchPodInfoList(nodeNames[0]);
    const allContainerNamesList = await containerPromql.fetchContainerNamesList();
    dispatch(actions.setPodInfo(podInfoList));
    setAllContainerNamesList(allContainerNamesList);
    }, []);
 
  //TODO: Set current pod based on user's selection from PodOverview component
  //if podNames is empty, get pod names array from Prometheus server and set state
  const handleChange = async (event) => {
    // set current pod
    if (podInfo === []) {
      const podInfoList = podPromql.fetchPodInfoList(nodeNames[0]);
      dispatch(actions.setPodInfo(podInfoList));
    }
    const currentPodInfoResult = await podPromql.fetchCurrentPodInfo(event.target.value);
    setCurrentPodInfo(currentPodInfoResult);
    setCurrentPod(event.target.value);
  }
  // Appbar uses display:flex + flex-direction: column
  // while Toolbar uses display:flex with default flex-direction: row to display items inline
  return(

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative' sx={{
        backgroundColor: primaryColor,
        width: '100%',
        marginBottom: '20px'
      }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Pod Details
          </Typography>
          <FormControl variant='filled' 
            sx={{ minWidth: 200, 
                  padding: 0,
                  border: '1px solid white',
                  borderRadius: '5px',
            }}>
            <InputLabel sx={{ color: 'white' }}>Current Pod</InputLabel>

            <Select sx={{ color: 'white' }} value={currentPod} onChange={handleChange}>
              {podInfo.map(pod => 
                <MenuItem key={pod.podName} value={pod.podName}>{pod.podName}</MenuItem>
              )} 

              {/* test dropdown item */}
              {/* <MenuItem value={'minikube-node'}>{'minikube-node'}</MenuItem> */}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <K8sContainerHeading podInfo={currentPodInfo}/>
      <K8sContainersOverview 
        podName={currentPod}
        podInfo={currentPodInfo}
        allContainers={allContainerNamesList}
      />  
    </Box>
  )
}
 
 export default K8sContainerViewContainer;
