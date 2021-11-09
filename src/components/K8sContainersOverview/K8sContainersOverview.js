/**
 * ************************************
 *
 * @module  K8sContainerOverview.js
 * @description component that renders basic information about an individual container within a pod
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import K8sContainerHeading from '../K8sContainerHeading/K8sContainerHeading';
import { styled } from '@mui/system';

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
  // for CPU Usage Values, return data in the following format to be readable by LineChart: 
  // [{ timeLabels:[timestamps],label: containerName, data: [values] }] 
  const updateCpuUsageValues = async () => {
    const startTime = Math.floor((Date.now() - 300000) / 1000.0);
    const endTime = Math.floor(Date.now() / 1000.0);
    const updatedCpuValues = { dataset: [] };

    for (let i = 0; i < podContainers.length; i++) {
      updatedCpuValues.timeLabels = [];
      updatedCpuValues.dataset[i] = { label: podContainers[i], data: [] };
      const containerCpuValues = await containerPromql.fetchRangeContainerCpuUsage(podContainers[i], startTime, endTime);
      containerCpuValues.forEach(value => {
        updatedCpuValues.timeLabels.push(new Date(value[0] * 1000).toLocaleString());
        updatedCpuValues.dataset[i].data.push(value[1]);
        updatedCpuValues.dataset[i].backgroundColor = '#2E9CCA',
        updatedCpuValues.dataset[i].borderColor = '#2E9CCA'
      });
    }
    return updatedCpuValues;
  }

  // for CPU Saturation Values, return data in the following format to be readable by LineChart: 
  // [{ timeLabels:[timestamps],label: containerName, data: [values] }] 
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
        updatedCpuSaturationValues.dataset[i].backgroundColor = '#2E9CCA',
        updatedCpuSaturationValues.dataset[i].borderColor = '#2E9CCA'
      });
    }
    return updatedCpuSaturationValues;
  }

  // for Memory Usage Values, return data in the following format to be readable by LineChart: 
  // [{ timeLabels:[timestamps],label: containerName, data: [values] }] 
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
        updatedMemoryValues.dataset[i].backgroundColor = '#2E9CCA',
        updatedMemoryValues.dataset[i].borderColor = '#2E9CCA'
      });
    }
    return updatedMemoryValues;
  }
  
  // for Memory Saturation Values, return data in the following format to be readable by LineChart: 
  // [{ timeLabels:[timestamps],label: containerName, data: [values] }] 
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
        updatedMemorySaturationValues.dataset[i].backgroundColor = '#2E9CCA',
        updatedMemorySaturationValues.dataset[i].borderColor = '#2E9CCA'
      });
    }
    return updatedMemorySaturationValues;
  }

  // update metric values with the results of calling the above functions and update state
  // BUG WITH SET INTERVAL: when you switch to a new pod, the previously selected pods' linecharts are still being rendered every 3 seconds**/
  useEffect(async () => {
    for (let i = 0; i < podContainers.length; i += 1) {
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

  // TODO: apply renderLineChart to component
  const renderLineChart = (title, xAxis, datasets) => {
    <Box>
      <h3>{title}</h3>
      <LineChart 
        key={title}
        metricName={title}
        xAxis={xAxis}
        datasets={datasets}
      />
    </Box>;
  };

  const GraphPaper = styled(Paper)(({ theme }) => ({
    padding: '10px',
    margin: '20px 0',
    fontSize: '16px'
  }));


  // render each line chart for the current pod with data from state (each container has its own line on each chart)
  // TODO: Return the LineChart element as part of a function call to stay DRY, since it's used multiple times
  return (
    <Box sx={{width: '100%'}}>

      {/* CPU Usage Line Chart */}
      <Box key={props.containerName}>
        <GraphPaper elevation={5}>
          <h2> {props.podName} </h2>
          <LineChart 
            key={props.podName + 'cpuUsage'}
            metricName="CPU Usage Seconds"
            xAxis={cpuTimeLabels}
            datasets={cpuDatasets}
          />
        </GraphPaper>
      </Box>

      {/* CPU Saturation Line Chart */}
      <Box key={props.containerName}>
        <GraphPaper elevation={5}>
          <h2> {props.podName} </h2>
          <LineChart 
            key={props.podName + 'cpuSaturation'}
            metricName="CPU Saturation (Seconds Throttled)"
            xAxis={cpuSaturationTimeLabels}
            datasets={cpuSaturationDatasets}
          />
        </GraphPaper>
      </Box>

      {/* Memory Usage Line Chart */}
      <Box key={props.containerName}>
        <GraphPaper elevation={5}>
          <h2> {props.podName} </h2>
          <LineChart 
            key={props.podName + 'memoryUsage'}
            metricName="Memory Usage (kilobytes)"
            xAxis={memoryTimeLabels}
            datasets={memoryDatasets}
          />
        </GraphPaper>
      </Box>

      {/* Memory Saturation Line Chart */}
      <Box key={props.containerName}>
        <GraphPaper elevation={5}>
          <h2> {props.podName} </h2>
          <LineChart 
            key={props.podName + 'memorySaturation'}
            metricName="Memory Saturation (percentage)"
            xAxis={memorySaturationTimeLabels}
            datasets={memorySaturationDatasets}
          />
        </GraphPaper>
      </Box>
    </Box>
  );
}

export default K8sContainersOverview;
