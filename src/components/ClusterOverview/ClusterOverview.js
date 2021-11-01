/**
 * ************************************
 *
 * @module  ClusterOverview
 * @description component that renders basic information about the user's cluster
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import { Doughnut } from 'react-chartjs-2';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import regeneratorRuntime from 'regenerator-runtime';

import * as clusterPromql from '../../utils/cluster-promql-util';

const getDeploymentData = async () => {
  const dataObj = await fetch(
    'http://localhost:30000/api/v1/query?query=kube_deployment_created',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());

  let dataArr = dataObj.data.result;

  dataArr = dataArr.map((el) => {
    //convert unix time from api result into Date & time format
    var formatDate = new Date(el.value[1] * 1000).toLocaleDateString('en-US');
    var formatTime = new Date(el.value[1] * 1000).toLocaleTimeString('en-US');

    return (
      <Box selected className='deploymentBox' key={el.metric.deployment}>
        <h2 selected className='h2Update'>
          {el.metric.deployment}
        </h2>
        <li>Instance: {el.metric.instance}</li>
        <li>Namespace: {el.metric.namespace}</li>
        <li>
          Created On: {formatDate} {formatTime}
        </li>
      </Box>
    );
  });

  return dataArr;
};

//create a functional component
const ClusterOverview = () => {
  //initialize state that is rendered only in this component
  const { nodeNames } = useSelector((state) => state.node);
  const [clusterCpuUsage, setClusterCpuUsage] = useState(0);
  const [clusterMemoryUsage, setClusterMemoryUsage] = useState(0);
  const [clusterTotalNodes, setClusterTotalNodes] = useState(0);
  const [clusterTotalDeployments, setClusterTotalDeployments] = useState(0);
  const [clusterTotalPods, setClusterTotalPods] = useState(0);
  const [clusterTotalServices, setClusterTotalServices] = useState(0);
  const [deploymentData, setDeployment] = useState([]);

  //fetch data from promQL server to update state
  useEffect(async () => {
    const currentClusterCpuUsage = await clusterPromql.fetchClusterCpuUsage();
    const currentClusterMemoryUsage =
      await clusterPromql.fetchClusterMemoryUsage();
    const currentTotalNodes = await clusterPromql.fetchTotalNodes();
    const currentTotalDeployments = await clusterPromql.fetchTotalDeployments();
    const currentTotalPods = await clusterPromql.fetchTotalPods();
    const currentTotalServices = await clusterPromql.fetchTotalServices();
    const deploymentData = await getDeploymentData();

    setClusterCpuUsage(currentClusterCpuUsage);
    setClusterMemoryUsage(currentClusterMemoryUsage);
    setClusterTotalNodes(currentTotalNodes);
    setClusterTotalDeployments(currentTotalDeployments);
    setClusterTotalPods(currentTotalPods);
    setClusterTotalServices(currentTotalServices);
    setDeployment(deploymentData);
  }, []);

  return (
    <Container>
      <h2>Cluster Name: {nodeNames}</h2>
      <div className='object-info-div'>
        <Box
          sx={{
            border: '1px solid black',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            p: 1,
            m: 1,
            width: '90%',
          }}
        >
          <Box
            sx={{
              border: '1px solid black',
              minWidth: 300,
              maxWidth: '45%',
            }}
          >
            <h2>CPU Usage (percent of total)</h2>
            <GaugeChart
              id='gauge-chart'
              nrOfLevels={3}
              colors={['#29648A', '#F8E9A1', '#F76C6C']}
              arcWidth={0.3}
              arcPadding={0}
              percent={clusterCpuUsage / 100}
              textColor={'#FFF'}
              needleColor='#FFF'
            />
          </Box>
          <Box
            sx={{
              border: '1px solid black',
              minWidth: 300,
              maxWidth: '45%',
            }}
          >
            <h2>Memory Usage (percent of allocatable memory)</h2>
            <GaugeChart
              id='gauge-chart'
              nrOfLevels={3}
              colors={['#29648A', '#F8E9A1', '#F76C6C']}
              arcWidth={0.3}
              arcPadding={0}
              percent={clusterMemoryUsage}
              textColor={'#FFF'}
              needleColor='#FFF'
            />
          </Box>
          <Box
            sx={{
              border: '1px solid black',
              minWidth: 300,
              maxWidth: '45%',
              textAlign: 'center',
            }}
          >
            <h2>Total Nodes in Cluster</h2>
            <span>{clusterTotalNodes}</span>
          </Box>
          <Box
            sx={{
              border: '1px solid black',
              minWidth: 300,
              maxWidth: '45%',
              textAlign: 'center',
            }}
          >
            <h2>Total Deployments in Cluster</h2>
            <span>{clusterTotalDeployments}</span>
          </Box>
          <Box
            sx={{
              border: '1px solid black',
              minWidth: 300,
              maxWidth: '45%',
              textAlign: 'center',
            }}
          >
            <h2>Total Pods in Cluster</h2>
            <span>{clusterTotalPods}</span>
          </Box>
          <Box
            sx={{
              border: '1px solid black',
              minWidth: 300,
              maxWidth: '45%',
              textAlign: 'center',
            }}
          >
            <h2>Total Services in Cluster</h2>
            <span>{clusterTotalServices}</span>
          </Box>

          <div className='deployment-div' style={{ width: '100%' }}>
            <h1 style={{ textAlign: 'center' }}>Deployments</h1>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                border: '1px solid black',

                p: 0.3,
                m: 0.3,
                maxWidth: '100%',
              }}
            >
              {deploymentData}
            </Box>
          </div>
        </Box>
      </div>
    </Container>
  );
};

export default ClusterOverview;
