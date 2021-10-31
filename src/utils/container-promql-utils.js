/**
 * ************************************
 *
 * @module  container-promql-requests
 * @description contains functions that fetches and return data about containers from the Prometheus server
 *
 * ************************************
 */
import { demoPodData } from "../DemoData/DemoPodData";

//FETCH FROM DEMO DATA to get list of pod names as an array
export const fetchDemoPodNamesList = () => {
  const data = JSON.parse(demoPodData)

  const podNamesList = data.data.result.map(result => {
    return result.metric.pod;
  });
  return podNamesList;  
}



//return container names and their associated pod name as an array of arrays where containerNamesList[0] = containerName, containerNamesList[1] = podName
export const fetchContainerNamesList = async () => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=kube_pod_container_info', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());

  const allContainerNamesList = data.data.result.map(result => {
    return [ result.metric.container, result.metric.pod ];
  });
  return allContainerNamesList;  
}

//return current CPU Usage rate and timestamp as an array where cpuUsage[0] = unixtimestamp, cpuUsage[1] = 
export const fetchContainerCpuUsage = async (containerName) => {
  const data = await fetch(`http://localhost:30000/api/v1/query?query=rate(container_cpu_usage_seconds_total{container="${containerName}"}[10m])`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());

  const containerCpuUsage = data.data.result[0].value;
  console.log('timestamp and cpu usage', containerCpuUsage);
  return containerCpuUsage;  
};