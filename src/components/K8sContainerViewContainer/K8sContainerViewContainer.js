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
import * as actions from '../../actions/actions'

const primaryColor = '#25274D';
 

const K8sContainerViewContainer = (props) => {

  //access podNames state from store, and set allContainerNamesList state
  const { podNames } = useSelector(state => state.pod);
  const { nodeNames } = useSelector(state => state.node);
  const [allContainerNamesList, setAllContainerNamesList] = useState([]);
  // keep track of current pod
  // set first pod in pod names list as default if defined
  const [ currentPod, setCurrentPod ] = useState(podNames[0] || 'no pod selected');

  const dispatch = useDispatch();

  //get array of pod names from prometheus server and use the array to update state
  //get all cluster's containers using fetch request and update state
  useEffect(async () => {
    const podNamesList = await podPromql.fetchPodNamesList(nodeNames[0]);
    const allContainerNamesList = await containerPromql.fetchContainerNamesList();
    dispatch(actions.setPodNames(podNamesList));
    setAllContainerNamesList(allContainerNamesList);
    }, []);
 
  //TODO: Set current pod based on user's selection from PodOverview component
  //if podNames is empty, get pod names array from Prometheus server and set state
  const handleChange = (event) => {
    // set current pod
    if (podNames === []) {
      const podNamesList = podPromql.fetchPodNamesList(nodeNames[0]);
      dispatch(actions.setPodNames(podNamesList));
    }
    setCurrentPod(event.target.value)
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
              {podNames.map(podName => 
                <MenuItem key={podName} value={podName}>{podName}</MenuItem>
              )} 

              {/* test dropdown item */}
              {/* <MenuItem value={'minikube-node'}>{'minikube-node'}</MenuItem> */}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      
      {/* render K8sContainerOverview component with currentPod and allContainers as props */}
      <K8sContainersOverview 
        podName={currentPod} 
        allContainers={allContainerNamesList}
      />  
    </Box>
  )
}
 
 export default K8sContainerViewContainer;
