import React, { useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';

const getDeploymentData = async () => {
  console.log('In deployment API get function');
  const data = await fetch(
    'http://localhost:9090/api/v1/query?query=kube_deployment_status_condition',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());

  console.log({ data });
  return;
};

const Deployments = () => {
  const [deploymentData, setDeployment] = useState({});

  useEffect(async () => {
    const deploymentData = await getDeploymentData();
    setDeployment(deploymentData);
  }, []);

  return <div className='deployment-div'>hello</div>;
};

export default Deployments;
