// /**
//  * ************************************
//  *
//  * @module deployments.js
//  * @description Fetches cluster deployment data and creates MUI components to render to client
//  *
//  * ************************************
//  */

// import React, { useState, useEffect } from 'react';
// import regeneratorRuntime from 'regenerator-runtime';
// import Box from '@mui/material/Box';

// //Fetch the deployment information from kube_state_metrics and return data as an array of objects
// //TODO: identify query to obtain "condition of deployment" kube_deployment_status_condition * on (deployment) group_left(instance) kube_deployment_created
// const getDeploymentData = async () => {
//   console.log('In deployment API get function');

//   const dataObj = await fetch(
//     'http://localhost:30000/api/v1/query?query=kube_deployment_created',
//     {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     }
//   ).then((res) => res.json());
//   // console.log({ dataObj });

//   let dataArr = dataObj.data.result;

//   dataArr = dataArr.map((el) => {

//     //convert unix time from api result into Date & time format
//     var formatDate = new Date(el.value[1] * 1000).toLocaleDateString('en-US');
//     var formatTime = new Date(el.value[1] * 1000).toLocaleTimeString('en-US');

//     return (
//       <Box
//         selected className='deploymentBox'
//         key={el.metric.deployment}
//       >
//         <h2 selected className='h2Update'> {el.metric.deployment} </h2>
//         <li>Instance: {el.metric.instance}</li>
//         <li>Namespace: {el.metric.namespace}</li>
//         <li>Condition: {el.metric.condition}</li>
//         <li>Created On: {formatDate} {formatTime}</li>
//       </Box>
//     );
//   });

//   return dataArr;
// };

// const DeploymentContainer = () => {
//   const [deploymentData, setDeployment] = useState([]);

//   useEffect(async () => {
//     const deploymentData = await getDeploymentData();
//     setDeployment(deploymentData);
//   }, []);

//   // console.log({ deploymentData });
//   return (
//     <div className='deployment-div' style={{ width: '100%' }}>
//       <h1 style={{ textAlign: 'center' }}>Deployments</h1>
//       <Box
//         sx={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           border: '1px solid black',

//           p: .3,
//           m: .3,
//           maxWidth: '100%',
//         }}
//       >
//         {deploymentData}
//       </Box>
//     </div>
//   );
// };

// export default DeploymentContainer;
