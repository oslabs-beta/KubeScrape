/**
 * ************************************
 *
 * @module  pod-promql-requests
 * @description contains functions that fetch and return data from the Prometheus server
 *
 * ************************************
 */


//return a pod names as an array of strings
export const fetchPodNamesList = async () => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=kube_pod_info', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const podNamesList = data.data.result.map(result => {
    return result.metric.pod;
  });
  // console.log(podNamesList);
  // 
  return podNamesList;  
}
//will need to query pods with node names
//deployments dont belong to a single node