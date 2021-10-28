/**
 * ************************************
 *
 * @module  NodeOverview
 * @description component that renders basic information about a node
 *
 * ************************************
 */


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import { Doughnut } from 'react-chartjs-2';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


import * as actions from '../../actions/actions';

//fetch requests to the Prometheus server are stored as functions in utils/promql-requests.js
import * as nodePromql from '../../utils/node-promql-util';

//create a functional component
export const NodeOverview = () => {

  //useSelector allows you to extract data from the Redux store state, using a selector function
  //this function accesses the state from the nodeReducer by subscribing to the store through sseSelector
  const { nodeNames, nodeCpuUsage, nodeMemoryUsage, nodeTotalPods, nodePodCapacity } = useSelector(state => state.node);
  const [nodeNetworkUtilization, setNodeNetworkUtilization] = useState(0);
  const [nodeNetworkErrors, setNodeNetworkErrors] = useState(0);

  //the useDispatch hook returns a reference to the dispatch function from the Redux store.
  //dispatch can now be used to dispatch actions as needed
  const dispatch = useDispatch();


  //the useEffect hook lets you perform side effects in function components. It tells React that we need to do something after render (like componentDidMount)
  //in these cases, useEffect is used to fetch data from the Prometheus server and using the results to update state
  useEffect(async () => {
    const nodeNamesList = await nodePromql.fetchNodeNamesList();
    const nodeCpuUsagePercentage = await nodePromql.fetchCpuUsage();
    const nodeMemoryUsagePercentage = await nodePromql.fetchMemoryUsage();
    const nodePodTotal = await nodePromql.fetchPodTotal();
    const nodePodCapacity = await nodePromql.fetchPodCapacity();
    const currentNetworkUtilization = await nodePromql.fetchNetworkUtilization();
    const currentNetworkErrors = await nodePromql.fetchNetworkErrors();
    dispatch(actions.getNodeNames(nodeNamesList))
    dispatch(actions.getCpuUsage(nodeCpuUsagePercentage))
    dispatch(actions.getMemoryUsage(nodeMemoryUsagePercentage));
    dispatch(actions.getPodTotal(nodePodTotal));
    dispatch(actions.getPodCapacity(nodePodCapacity));
    setNodeNetworkUtilization(currentNetworkUtilization);
    setNodeNetworkErrors(currentNetworkErrors);
  }, []);

  return (
    <div className="node-info-div">
      <Container 
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
      >
        <h2>Node Name: {nodeNames}</h2>
        <Box sx={{border: '1px solid red'}}>
          <h2>CPU Usage (percent of total)</h2>
          <GaugeChart id="gauge-chart" 
            nrOfLevels={30} 
            colors={["#FF5F6D", "#FFC371"]} 
            arcWidth={0.3} 
            percent={nodeCpuUsage / 100} 
            textColor={"#000"}
          />
        </Box>
        <Box sx={{border: '1px solid red'}}>
          <h2>Memory Usage (percent of allocatable memory)</h2>
          <GaugeChart id="gauge-chart" 
            nrOfLevels={30} 
            colors={["#FF5F6D", "#FFC371"]} 
            arcWidth={0.3} 
            percent={nodeMemoryUsage} 
            textColor={"#000"}
          />
        </Box>
        <Box sx={{border: '1px solid red'}}>
          <h2>Pods Running</h2>
          <Doughnut id="doughnut-2"
            data={{
              labels: ['Number of Running Pods', 'Remaining Pod Capacity'],
              datasets: [{
                data: [nodeTotalPods, nodePodCapacity - nodeTotalPods],
                backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)']
              }]
            }}
          />
        </Box>
        <Box sx={{border: '1px solid red'}}>
          <h2>Current Network Utilization</h2>
          <span>{nodeNetworkUtilization}</span> <p>kilobytes per second</p>
        </Box>
        <Box sx={{border: '1px solid red'}}>
          <h2>Total Network Errors</h2>
          <span>{nodeNetworkErrors}</span> <p>errors while transmitting or receiving</p>
        </Box>
      </Container>

    </div>
  )
}
