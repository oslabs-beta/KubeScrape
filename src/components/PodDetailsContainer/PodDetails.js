/**
 * ************************************
 *
 * @module PodDetailsContainer.js
 * @description Component to render details of each individual K8s Pod
 * 
 * ************************************
 */

 import React, { useState, useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import AppBar from '@mui/material/AppBar';
 import Box from '@mui/material/Box';
 import Toolbar from '@mui/material/Toolbar';
 import Typography from '@mui/material/Typography';
 import FormControl from '@mui/material/FormControl';
 import Select from '@mui/material/Select';
 import MenuItem from '@mui/material/MenuItem';
 import InputLabel from '@mui/material/InputLabel';
import PodOverview from '../PodOverview/PodOverview';
 import * as actions from '../../actions/actions';
 import * as podPromql from '../../utils/pod-promql-util';
 
 const primaryColor = '#25274D';
 
 const PodDetailsContainer = () => {
   
  const [podName, setPod] = useState('');
  //useSelector allows you to extract data from the Redux store state, using a selector function
  //this function accesses the state from the nodeReducer by subscribing to the store through sseSelector
  const { podNames } = useSelector(state => state.pod);

  //the useDispatch hook returns a reference to the dispatch function from the Redux store.
  //dispatch can now be used to dispatch actions as needed
  const dispatch = useDispatch();

  const handleChange = event => {
    setPod(event.target.value);
  }

   useEffect(async () => {
     const podNamesList = await podPromql.fetchPodNamesList();
     dispatch(actions.setPodNames(podNamesList));
    }, []);
 
   const podEls = podNames.map((podName, index) => {
     return <PodOverview key={'pod' + index}podName={podName}/>
   });

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
             <InputLabel sx={{ color: 'white' }}>View Pod</InputLabel>
             <Select sx={{ color: 'white' }} value={podName} onChange={handleChange}>
               <MenuItem value='Pod 1'>Pod 1</MenuItem>
               <MenuItem value='Pod 2'>Pod 2</MenuItem>
               <MenuItem value='Pod 3'>Pod 3</MenuItem>
             </Select>
           </FormControl>
         </Toolbar>
       </AppBar>
 
       {podEls}
 
     </Box>
   )
 }
 
 export default PodDetailsContainer;