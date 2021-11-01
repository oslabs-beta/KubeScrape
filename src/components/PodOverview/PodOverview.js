/**
 * ************************************
 *
 * @module  PodOverview
 * @description component that renders basic information about a pod
 *
 * ************************************
 */


 import React, { useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import GaugeChart from 'react-gauge-chart';
 import { Doughnut } from 'react-chartjs-2';
 
 import * as actions from '../../actions/actions';
 
 //fetch requests to the Prometheus server are stored as functions in utils/promql-requests.js
 import * as podPromql from '../../utils/pod-promql-util';
 
 
  //create a functional component
  export const PodOverview = (props) => {
  
 
  
    //the useEffect hook lets you perform side effects in function components. It tells React that we need to do something after render (like componentDidMount)
    //in these cases, useEffect is used to fetch data from the Prometheus server and using the results to update state
 
  
    return (
      <div className="pod-info-div">
        <h2>{ props.podName }</h2>
        <div className="chart-div">
          {/* <h2>CPU Usage (percent of total)</h2>
          <GaugeChart id="gauge-chart" 
            nrOfLevels={30} 
            colors={["#FF5F6D", "#FFC371"]} 
            arcWidth={0.3} 
           //  percent={nodeCpuUsage / 100} 
            textColor={"#000"}
          /> */}
        </div>
        {/* <h2>Memory Usage (percent of total)</h2> */}
        {/* <Doughnut id="doughnut"
          data={{
            labels: ['Memory in Use', 'Available Memory'],
            datasets: [{
              data: [nodeMemoryUsage, 100 - nodeMemoryUsage],
              backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)']
            }]
          }}
        /> */}
        {/* <h2>Current number of pods: {nodeTotalPods}</h2> */}
        {/* <h2>Total pod capacity: {nodePodCapacity}</h2> */}
  
      </div>
    )
  }
  
  export default PodOverview;