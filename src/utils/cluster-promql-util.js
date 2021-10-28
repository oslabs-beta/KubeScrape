/**
 * ************************************
 *
 * @module  cluster-promql-requests
 * @description contains functions that fetch and return data about the cluster from the Prometheus server
 *
 * ************************************
 */


//return the total number of deployments created in the node
export const fetchDeploymentTotal = async () => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=count(kube_deployment_created)', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const deploymentTotal = data.data.result[0].value[1];
  console.log(deploymentTotal)
  return deploymentTotal;  
}
