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
// timeFunction converts unix timestamp to human readable time for line charts
import timeFunction from '../../utils/time-function-util';
import K8sContainerHeading from '../K8sContainerHeading/K8sContainerHeading';

// fetch requests to the Prometheus server are stored as functions in utils/promql-requests.js
import * as containerPromql from '../../utils/container-promql-util';
import LineChart from '../charts/LineChart';

// Define the following in this component's state to pass to linecharts as props:
// CpuUtilization (seconds), MemoryUtilization (bytes), CpuSaturation (throttled seconds), Memory Saturation (percentage of limit)
// timeLabels for x-axes as an array, datasets for y-axes as an array of objects (one object per container)
const K8sContainersOverview = (props) => {
  const [ podContainers, setPodContainers ] = useState([]);
  const [ cpuTimeLabels, setCpuTimeLabels ] = useState([]);
  const [ cpuDatasets, setCpuDatasets ] = useState([]);
  const [ cpuSaturationTimeLabels, setCpuSaturationTimeLabels ] = useState([]);
  const [ cpuSaturationDatasets, setCpuSaturationDatasets ] = useState([]);
  const [ memoryTimeLabels, setMemoryTimeLabels ] = useState([]);
  const [ memoryDatasets, setMemoryDatasets ] = useState([]);
  const [ memorySaturationTimeLabels, setMemorySaturationTimeLabels ] = useState([]);
  const [ memorySaturationDatasets, setMemorySaturationDatasets ] = useState([]);
 
  // whenever allContainers or podName are updated in K8sContainerViewContainer, get all current pod's containers and update state
  useEffect(() => {
    const currentPodContainers = [];
    props.allContainers.forEach(container => {
      if (container[1] === props.podName){
        currentPodContainers.push(container[0]);
      }
    })
    setPodContainers(currentPodContainers);
  }, [props.allContainers, props.podName]);

  // there is an 'update' function for each metric: CPU Usage, CPU Saturation, Memory Usage, and Memory Saturation
  // for each of the four metrics below, return data in the following format to be readable by LineChart: 
  //[{ timeLabels:[timestamps],label: containerName, data: [values] }] 
  const updateCpuUsageValues = async () => {
      const startTime = Math.floor((Date.now() - 300000) / 1000.0);
      const endTime = Math.floor(Date.now() / 1000.0);
      const updatedCpuValues = { timeLabels: [], dataset: [] };

      for (let i = 0; i < podContainers.length; i++) {
        updatedCpuValues.timeLabels = [];
        updatedCpuValues.dataset[i] = { label: podContainers[i], data: [] };
        const containerCpuValues = await containerPromql.fetchRangeContainerCpuUsage(podContainers[i], startTime, endTime);
        containerCpuValues.forEach(value => {
          updatedCpuValues.timeLabels.push(new Date(value[0] * 1000).toLocaleString());
          updatedCpuValues.dataset[i].data.push(value[1]);
          updatedCpuValues.dataset[i].backgroundColor = 'rgb(255, 99, 132)',
          updatedCpuValues.dataset[i].borderColor = 'rgba(255, 99, 132, 0.2)'
        });
      }
      return updatedCpuValues;
  }

  const updateCpuSaturationValues = async () => {
    const startTime = Math.floor((Date.now() - 300000) / 1000.0);
    const endTime = Math.floor(Date.now() / 1000.0);
    const updatedCpuSaturationValues = { timeLabels: [], dataset: [] };

    for (let i = 0; i < podContainers.length; i++) {
      updatedCpuSaturationValues.timeLabels = [];
      updatedCpuSaturationValues.dataset[i] = { label: podContainers[i], data: [] };
      const containerCpuSaturationValues = await containerPromql.fetchRangeContainerCpuSaturation(podContainers[i], startTime, endTime);
      if (containerCpuSaturationValues === 0) {
        updatedCpuSaturationValues.dataset[i].label = `${podContainers[i]}: No CPU Seconds Throttled`
        return updatedCpuSaturationValues;
      }
      containerCpuSaturationValues.forEach(value => {
        updatedCpuSaturationValues.timeLabels.push(new Date(value[0] * 1000).toLocaleString());
        updatedCpuSaturationValues.dataset[i].data.push(value[1]);
        updatedCpuSaturationValues.dataset[i].backgroundColor = 'rgb(255, 99, 132)',
        updatedCpuSaturationValues.dataset[i].borderColor = 'rgba(255, 99, 132, 0.2)'
      });
    }
    return updatedCpuSaturationValues;
  }

  const updateMemoryUsageValues = async () => {
    const startTime = Math.floor((Date.now() - 300000) / 1000.0);
    const endTime = Math.floor(Date.now() / 1000.0);
    const updatedMemoryValues = { timeLabels: [], dataset: [] };

    for (let i = 0; i < podContainers.length; i++) {
      updatedMemoryValues.timeLabels = [];
      updatedMemoryValues.dataset[i] = { label: podContainers[i], data: [] };
      const containerMemoryValues = await containerPromql.fetchRangeContainerMemoryUsage(podContainers[i], startTime, endTime);
      containerMemoryValues.forEach(value => {
        updatedMemoryValues.timeLabels.push(new Date(value[0] * 1000).toLocaleString());
        updatedMemoryValues.dataset[i].data.push(value[1] / 1024);
        updatedMemoryValues.dataset[i].backgroundColor = 'rgb(255, 99, 132)',
        updatedMemoryValues.dataset[i].borderColor = 'rgba(255, 99, 132, 0.2)'
      });
    }
    return updatedMemoryValues;
  }
  
  const updateMemorySaturationValues = async () => {
    const startTime = Math.floor((Date.now() - 300000) / 1000.0);
    const endTime = Math.floor(Date.now() / 1000.0);
    const updatedMemorySaturationValues = { timeLabels: [], dataset: [] };
    for (let i = 0; i < podContainers.length; i++) {
      updatedMemorySaturationValues.timeLabels = [];
      updatedMemorySaturationValues.dataset[i] = { label: podContainers[i], data: [] };
      const containerMemorySaturationValues = await containerPromql.fetchRangeContainerMemorySaturation(podContainers[i], startTime, endTime);
      if (containerMemorySaturationValues === 0) {
        updatedMemorySaturationValues.dataset[i].label = `${podContainers[i]}: No Memory Limit Set`
        return updatedMemorySaturationValues;
      }
      containerMemorySaturationValues.forEach(value => {
        updatedMemorySaturationValues.timeLabels.push(new Date(value[0] * 1000).toLocaleString());
        updatedMemorySaturationValues.dataset[i].data.push(value[1] * 100);
        updatedMemorySaturationValues.dataset[i].backgroundColor = 'rgb(255, 99, 132)',
        updatedMemorySaturationValues.dataset[i].borderColor = 'rgba(255, 99, 132, 0.2)'
      });
    }
    return updatedMemorySaturationValues;
  }

  // update metric values with the results of calling the above functions and update state
  // BUG WITH SET INTERVAL: when you switch to a new pod, the previously selected pods' linecharts are still being rendered every 3 seconds**/
  useEffect(async () => {
    for (const container of podContainers) {
      const updatedCpuValues = await updateCpuUsageValues();
      const updatedCpuSaturationValues = await updateCpuSaturationValues();
      const updatedMemoryValues = await updateMemoryUsageValues();
      const updatedMemorySaturationValues = await updateMemorySaturationValues();
      setCpuTimeLabels(updatedCpuValues.timeLabels);
      setCpuDatasets(updatedCpuValues.dataset);
      setCpuSaturationTimeLabels(updatedCpuSaturationValues.timeLabels);
      setCpuSaturationDatasets(updatedCpuSaturationValues.dataset);
      setMemoryTimeLabels(updatedMemoryValues.timeLabels);
      setMemoryDatasets(updatedMemoryValues.dataset);
      setMemorySaturationTimeLabels(updatedMemorySaturationValues.timeLabels);
      setMemorySaturationDatasets(updatedMemorySaturationValues.dataset);
    }

  }, [podContainers]);

  // render each line chart for the current pod with data from state (each container has its own line on each chart)
  // TODO: Return the LineChart element as part of a function call to stay DRY, since it's used multiple times
  return (
    <Box>
      <Box>
      <K8sContainerHeading podInfo={props.podInfo}/>
      </Box>

      {/* CPU Usage Line Chart */}
      <Box
        key={props.containerName}
        sx={{
          border: '1px solid black',
          p: .3,
          m: .3,
          borderRadius: 1,
          fontSize: '0.75rem',
        }}
      >
        <h2> {props.podName} </h2>
        <LineChart 
          key={props.podName + 'cpuUsage'}
          metricName="CPU Usage Seconds"
          xAxis={cpuTimeLabels}
          datasets={cpuDatasets}
        />
      </Box>

      {/* CPU Saturation Line Chart */}
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
          key={props.podName + 'cpuSaturation'}
          metricName="CPU Saturation (Seconds Throttled)"
          xAxis={cpuSaturationTimeLabels}
          datasets={cpuSaturationDatasets}
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
        key={props.podName + 'memoryUsage'}
        metricName="Memory Usage (kilobytes)"
        xAxis={memoryTimeLabels}
        datasets={memoryDatasets}
      />
      </Box>

      {/* Memory Saturation Line Chart */}
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
        key={props.podName + 'memorySaturation'}
        metricName="Memory Saturation (percentage)"
        xAxis={memorySaturationTimeLabels}
        datasets={memorySaturationDatasets}
      />
      </Box>
    </Box>
  );
}

export default K8sContainersOverview;
