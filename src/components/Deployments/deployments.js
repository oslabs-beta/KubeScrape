/**
 * ************************************
 *
 * @module deployments.js
 * @description Fetches cluster deployment data and creates MUI components to render to client
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import Box from '@mui/material/Box';

//Fetch the deployment information from kube_state_metrics and return data as an array of objects
//TODO: identify query to obtain "condition of deployment" kube_deployment_status_condition * on (deployment) group_left(instance) kube_deployment_created
const getDeploymentData = async () => {
  console.log('In deployment API get function');

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
  console.log({ dataObj });

  let dataArr = dataObj.data.result;
    console.log(dataArr)
  // console.log('name: ' + dataArr[0].metric.deployment);
  // console.log('condition: ' + dataArr[0].metric['condition']);

  dataArr = dataArr.map((el) => {
    
    return (
      <Box
        key={el.metric.instance}
        sx={{
          bgcolor: 'primary.main',
          // color: 'white',
          // borderColor: 'black',
          p: 1,
          m: 1,
          borderRadius: 1,
          // textAlign: 'center',
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        <h3> {el.metric.deployment} </h3>
        <p>Instance: {el.metric.instance}</p>
        <p>Namespace: {el.metric.namespace}</p>
        <p>Condition: {el.metric.condition}</p>
      </Box>
    );
  });
  console.log(dataArr);

  return dataArr;
};

export const Deployments = () => {
  const [deploymentData, setDeployment] = useState([]);

  useEffect(async () => {
    const deploymentData = await getDeploymentData();
    setDeployment(deploymentData);
    //console.log({deploymentDivs})
  }, []);

  console.log({ deploymentData });
  return (
    <div className='deployment-div' style={{ width: '700%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          maxWidth: 500,
        }}
      >
        <h1>Deployments</h1>
        {deploymentData}
      </Box>
    </div>
  );
};
