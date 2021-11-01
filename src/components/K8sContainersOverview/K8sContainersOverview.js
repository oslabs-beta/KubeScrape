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
  const [cpuTimeLabels, setCpuTimeLabels] = useState([]);
  const [cpuDatasets, setCpuDatasets] = useState([]);
  const [memoryTimeLabels, setMemoryTimeLabels] = useState([]);
  const [memoryDatasets, setMemoryDatasets] = useState([]);
 
  //get all current pod's containers and update state

  useEffect(() => {
    const currentPodContainers = [];
    props.allContainers.forEach(container => {
      if (container[1] === props.podName){
        currentPodContainers.push(container[0]);
      }
    })
    setPodContainerNamesList(currentPodContainers);
  }, [props.allContainers, props.podName]);


// return data in the following format to be readable by LineChart: [{label: containerName, data: [values]}] 
// return timeLabels as an array
const updateCpuUsageValues = async () => {
    const startTime = Math.floor((Date.now() - 300000) / 1000.0);
    const endTime = Math.floor(Date.now() / 1000.0);
    const updatedCpuValues = { timeLabels: [], dataset: [] };

    for (let i = 0; i < podContainerNamesList.length; i++) {
      updatedCpuValues.dataset[i] = { label: podContainerNamesList[i], data: [] };
      const containerCpuValues = await containerPromql.fetchRangeContainerCpuUsage(podContainerNamesList[i], startTime, endTime);
      containerCpuValues.forEach(value => {
        updatedCpuValues.timeLabels.push(timeFunction(value[0]));
        updatedCpuValues.dataset[i].data.push(value[1]);
        updatedCpuValues.dataset[i].backgroundColor = 'rgb(255, 99, 132)',
        updatedCpuValues.dataset[i].borderColor = 'rgba(255, 99, 132, 0.2)'
      });
    }
    return updatedCpuValues;
}

const updateMemoryUsageValues = async () => {
  const startTime = Math.floor((Date.now() - 300000) / 1000.0);
  const endTime = Math.floor(Date.now() / 1000.0);
  const updatedMemoryValues = { timeLabels: [], dataset: [] };

  for (let i = 0; i < podContainerNamesList.length; i++) {
    updatedMemoryValues.dataset[i] = { label: podContainerNamesList[i], data: [] };
    const containerMemoryValues = await containerPromql.fetchRangeContainerMemoryUsage(podContainerNamesList[i], startTime, endTime);
    containerMemoryValues.forEach(value => {
      updatedMemoryValues.timeLabels.push(timeFunction(value[0]));
      updatedMemoryValues.dataset[i].data.push(value[1]);
      updatedMemoryValues.dataset[i].backgroundColor = 'rgb(255, 99, 132)',
      updatedMemoryValues.dataset[i].borderColor = 'rgba(255, 99, 132, 0.2)'
    });
  }
  return updatedMemoryValues;
}


//**START HERE BROKEN**/
useEffect(async () => {
  for (const container of podContainerNamesList) {
    const updatedCpuValues = await updateCpuUsageValues();
    const updatedMemoryValues = await updateMemoryUsageValues();
    setCpuTimeLabels(updatedCpuValues.timeLabels);
    setCpuDatasets(updatedCpuValues.dataset);
    setMemoryTimeLabels(updatedMemoryValues.timeLabels);
    setMemoryDatasets(updatedMemoryValues.dataset);
    const interval = setInterval(async () => {
      const updatedCpuValues = await updateCpuUsageValues();
      const updatedMemoryValues = await updateMemoryUsageValues();
      setCpuTimeLabels(updatedCpuValues.timeLabels);
      setCpuDatasets(updatedCpuValues.dataset);
      setMemoryTimeLabels(updatedMemoryValues.timeLabels);
      setMemoryDatasets(updatedMemoryValues.dataset);
    }, 3000)
    return () => clearInterval(interval);
  }

}, [podContainerNamesList]);

console.log('usedeffect ', memoryTimeLabels, memoryDatasets)


  //returns single value and timestamp every 3 seconds
  // useEffect(async() => {
  //   await containerPromql.fetchContainerCpuUsage(props.containerName);
  //   const interval = setInterval(() => {
  //     containerPromql.fetchContainerCpuUsage(props.containerName)
  //   }, 3000)
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Box>

      {/* CPU Usage Line Chart */}
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
          xAxis={cpuTimeLabels}
          datasets={cpuDatasets}
        />
      </Box>

      {/* Memory Usage Line Chart */}
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
        metricName="Memory Usage"
        xAxis={memoryTimeLabels}
        datasets={memoryDatasets}
      />
      </Box>
    </Box>
  );
}


export default K8sContainersOverview;
