/**
 * ************************************
 *
 * @module  NodeOverview.js
 * @description component that renders basic information about a node
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import { Doughnut } from 'react-chartjs-2';
import * as actions from '../../actions/actions';

//fetch requests to the Prometheus server are stored as functions in utils/promql-requests.js
import * as nodePromql from '../../utils/node-promql-util';

//create a functional component
export const NodeOverview = () => {

  //useSelector allows you to extract data from the Redux store state, using a selector function
  //this function accesses the state from the nodeReducer by subscribing to the store through sseSelector
  const { nodeNames, nodeCpuUsage, nodeMemoryUsage, nodeTotalPods, nodePodCapacity } = useSelector(state => state.node);

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
    dispatch(actions.getNodeNames(nodeNamesList))
    dispatch(actions.getCpuUsage(nodeCpuUsagePercentage))
    dispatch(actions.getMemoryUsage(nodeMemoryUsagePercentage));
    dispatch(actions.getPodTotal(nodePodTotal));
    dispatch(actions.getPodCapacity(nodePodCapacity));
  }, []);

  return (
    <div className="node-info-div">
      <h2>{nodeNames}</h2>
      <div className="chart-div">
        <h2>CPU Usage (percent of total)</h2>
        <GaugeChart id="gauge-chart" 
          nrOfLevels={30} 
          colors={["#FF5F6D", "#FFC371"]} 
          arcWidth={0.3} 
          percent={nodeCpuUsage / 100} 
          textColor={"#000"}
        />
      </div>
      <h2>Memory Usage (percent of total)</h2>
      <Doughnut id="doughnut"
        data={{
          labels: ['Memory in Use', 'Available Memory'],
          datasets: [{
            data: [nodeMemoryUsage, 100 - nodeMemoryUsage],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)']
          }]
        }}
      />
      <h2>Current number of pods: {nodeTotalPods}</h2>
      <h2>Total pod capacity: {nodePodCapacity}</h2>
    </div>
  )
}
