/**
 * ************************************
 *
 * @module PodViewContainer.js
 * @description Component to get information about each container in the current pod, and pass that information to graph components render details of a single K8s pod
 * 
 * ************************************
 */

 import React, { useEffect, useState } from 'react';
 import { useSelector } from 'react-redux';
 import AppBar from '@mui/material/AppBar';
 import Box from '@mui/material/Box';
 import Toolbar from '@mui/material/Toolbar';
 import Typography from '@mui/material/Typography';
 import FormControl from '@mui/material/FormControl';
 import Select from '@mui/material/Select';
 import MenuItem from '@mui/material/MenuItem';
 import InputLabel from '@mui/material/InputLabel';
 import K8sContainerOverview from '../K8sContainerOverview/K8sContainerOverview';
 import * as containerPromql from '../../utils/container-promql-utils';
 
 const primaryColor = '#25274D';
 
 //
 const PodViewContainer = () => {
   //TODO: Update to get list of pod names from the redux store
   const [podNamesList, setPodnamesList] = useState(containerPromql.fetchDemoPodNamesList());
   const [allContainerNamesList, setContainerNamesList] = useState([]);

 
   // keep track of current pod
   // set first pod in pod names list as default if defined
   const [ currentPod, setCurrentPod ] = useState(podNamesList[0] || 'posts-depl-66f4cf7589-d2n6q');
 
   //TODO: Set current pod based on user's selection from PodOverview component AND PodViewContainer dropdown menu
   const handleChange = (event) => {
     // set current pod
     setCurrentPod(event.target.value)
   }
 
   console.log('current pod: ', currentPod)

   //TODO: Map through container info for current pod:
   //For each container in the allContainers list,
   //render a K8sPodOverview component with containtername as props:
   

   //allContainerNamesList is an array of arrays where containerNamesList[0] = containerName, containerNamesList[1] = podName
   useEffect(async () => {
    const allContainerNamesList = await containerPromql.fetchContainerNamesList();
    setContainerNamesList(allContainerNamesList);
   }, []);

   const currentPodK8sContainers = allContainerNamesList.map((container, index) => {
     if (container[1] === currentPod) {
       return <K8sContainerOverview key={index} containerName={container[0]}/>
     }
   })

  console.log('this pod\'s containers: ', currentPodK8sContainers);

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
               {podNamesList.map(podName => 
                 <MenuItem key={podName} value={podName}>{podName}</MenuItem>
               )} 

               {/* test dropdown item */}
               <MenuItem value={'minikube-node'}>{'minikube-node'}</MenuItem>
             </Select>
           </FormControl>
         </Toolbar>
       </AppBar>
 
       {currentPodK8sContainers}
 
     </Box>
   )
 }
 
 export default PodViewContainer;