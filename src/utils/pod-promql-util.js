/**
 * ************************************
 *
 * @module  pod-promql-requests
 * @description contains functions that fetch and return data from the Prometheus server
 *
 * ************************************
 */


//return a pod names as an array of strings
export const fetchPodNamesList = async (nodeName) => {
  const data = await fetch(`http://localhost:30000/api/v1/query?query=kube_pod_info{node="${nodeName}"}`, {
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
  return podNamesList;  
}

//return a pod info as an array of objects with {name, node, namespace, ip, deployment}
export const fetchPodInfoList = async (nodeName) => {
  const data = await fetch(`http://localhost:30000/api/v1/query?query=kube_pod_info{node="${nodeName}"}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const podInfoList = data.data.result.map(result => {
    return { 
      podName: result.metric.pod, 
      podNamespace: result.metric.namespace, 
      podIp: result.metric.pod_ip, 
      createdByDeployment: result.metric.created_by_name,
      uid: result.metric.uid
    };
  });
  return podInfoList;  
}
