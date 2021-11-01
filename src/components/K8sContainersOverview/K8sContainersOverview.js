/**
 * ************************************
 *
 * @module  K8sContainerOverview.js
 * @description component that renders basic information about an individual container within a pod
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import timeFunction from '../../utils/timeFunction';

//fetch requests to the Prometheus server are stored as functions in utils/promql-requests.js
import * as containerPromql from '../../utils/container-promql-utils';
import LineChart from '../charts/LineChart';

//TODO: Define the following in this component's state to pass to linecharts as props:
//CpuUtilization, MemoryUtilization, CpuSaturation, Memory Saturation

const K8sContainersOverview = (props) => {
  const [podContainerNamesList, setPodContainerNamesList] = useState([]);
  const [containerCpuUsageValues, setContainerCpuUsageValues] = useState({});
  const [timeLabels, setTimeLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  console.log('all contaners ', props.podName, props.allContainers);
 
  //get all current pod's containers and update state

  useEffect(() => {
    const currentPodContainers = [];
    props.allContainers.forEach(container => {
      if (container[1] === props.podName){
        currentPodContainers.push(container[0]);
      }
    })
    setPodContainerNamesList(currentPodContainers);
  }, [props.allContainers]);

  useEffect(async () => {
    const updatedCpuUsageValues = updateCpuUsageValues();
    setContainerCpuUsageValues(updatedCpuUsageValues);
  }, [podContainerNamesList]);


  //****START HERE****//
 // return data in the following format to be readable by LineChart: {label: containerName, data: [values]} 
// return timeLabels as an array
// const updateCpuUsageValues = () => {
//     const startTime = Math.floor((Date.now() - 300000) / 1000.0);
//     const endTime = Math.floor(Date.now() / 1000.0);
//     for (let i = 0; i < podContainer)
// }

 
  

  ///COMMENT OUT / DELETE WHEN DONE
  // const setCpuUsageValues = async () => {
  //   const startTime = Math.floor((Date.now() - 300000) / 1000.0);
  //   const endTime = Math.floor(Date.now() / 1000.0);
  //   let updatedCpuValues = {};
  //   for (const container in podContainerNamesList) {
  //     updatedCpuValues[container] = await containerPromql.fetchRangeContainerCpuUsage(container, startTime, endTime);
  //   }
  //   console.log('VALUES:', updatedCpuValues)
  //   return updatedCpuValues;
  // }
 

  // const setCpuUsageValues = async () => {
  //   const startTime = Math.floor((Date.now() - 300000) / 1000.0);
  //   const endTime = Math.floor(Date.now() / 1000.0);
  //   let updatedDataset;
  //   let updatedTimeLabels;
  //   for (const container in podContainerNamesList) {
  //     const cpuUsageValues = await containerPromql.fetchRangeContainerCpuUsage(container, startTime, endTime);
  //     // an array of updated cpuUsage values
  //     const containerData = cpuUsageValues.map(value => {
  //       return Math.floor(value[1] * 1000.0);
  //     })
  //     //a dataset object readable by the LineChart component
  //     const updatedDataset = { label: container, data: containerData };

  //     //an array of update times associated with each value
  //     const updatedTimeLabels = cpuUsageValues.map(value => {
  //       return timeFunction(value[0]);
  //     })


  //     console.log('dataset: ', updatedDataset, ', timelabels: ', updatedTimeLabels)
  //   }
  //   return { timeLabels: updatedTimeLabels, datasets: updatedDataset }

  // }
  // //allContainerNamesList is an array of arrays where containerNamesList[0] = containerName, containerNamesList[1] = podName
  // useEffect(async () => {
  

  //   // check if container's pod name is equal to current pod name
  //   // if it is, add to podContainerNamesList in state

  //   console.log('PODS: ', podContainerNamesList)
  //   const values = await setCpuUsageValues();
  //   setContainerCpuUsageValues(values);

    
  //   // const values = await updateCpuUsageValues();
  //   // setTimeLabels(values[timeLabels]);
  //   // setDatasets(datasets.concat(values[datasets]));
  //   // console.log('here: ', timeLabels, 'there: ',datasets)
  // }, []);


  //returns single value and timestamp every 3 seconds
  // useEffect(async() => {
  //   await containerPromql.fetchContainerCpuUsage(props.containerName);
  //   const interval = setInterval(() => {
  //     containerPromql.fetchContainerCpuUsage(props.containerName)
  //   }, 3000)
  //   return () => clearInterval(interval);
  // }, []);

  return (
 
    <Box
      key={props.containerName}
      sx={{
        border: '1px solid black',
        p: .3,
        m: .3,
        borderRadius: 1,
        // textAlign: 'center',
        fontSize: '0.75rem',
        // maxWidth: 225
      }}
    >
      <h2> {props.podName} </h2>
      <LineChart 
        key={props.podName + 'cpuUsage'}
        metricName="CPU Usage"
        xAxis={timeLabels}
        datasets={datasets}
        // xAxisLabel='# of Votes'
      />

      {/* <li>Created On: {formatDate} {formatTime}</li> */}
    </Box>
  );
}


export default K8sContainersOverview;