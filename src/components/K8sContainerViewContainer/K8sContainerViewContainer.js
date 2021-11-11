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
import { Box, Container } from '@mui/material';
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

  //access podInfo state from store, and set allContainers state
  const { podInfo } = useSelector(state => state.pod);
  const { nodes } = useSelector(state => state.cluster);
  const [ allContainers, setAllContainers ] = useState([]);

  // keep track of current pod
  // set first pod in pod names list as default if it's defined
  const [ currentPod, setCurrentPod ] = useState(podInfo[0]?.podName || 'no pod selected');
  const [ currentPodInfo, setCurrentPodInfo ] = useState(podInfo[0] || []);

  const dispatch = useDispatch();

  //get array of pod names from prometheus server and use the array to update state
  //get all cluster's containers using fetch request and update state
  useEffect(async () => {
    const podInfoArray = await podPromql.fetchPodInfoList(nodes[0]);
    const allContainers = await containerPromql.fetchContainerNames();
    dispatch(actions.setPodInfo(podInfoArray));
    setAllContainers(allContainers);
    }, []);
    console.log(podInfo)
  // get info on the user-selected pod and update state
  const handleChange = async (event) => {
    const currentPodInfo = await podPromql.fetchCurrentPodInfo(event.target.value);
    setCurrentPodInfo(currentPodInfo);
  }
  
  // Appbar uses display:flex + flex-direction: column
  // while Toolbar uses display:flex with default flex-direction: row to display items inline
  return(

    <Box sx={{ flexGrow: 1, width: '90%' }}>
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

            <Select sx={{ color: 'white' }} value={currentPodInfo.podName} onChange={handleChange}>
              {podInfo.map(pod => 
                <MenuItem key={pod.podName} value={pod.podName}>{pod.podName}</MenuItem>
              )} 
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <K8sContainerHeading podInfo={currentPodInfo}/>
      <K8sContainersOverview 
        podInfo={currentPodInfo}
        allContainers={allContainers}
      />  
    </Box>
  )
}
 
 export default K8sContainerViewContainer;
