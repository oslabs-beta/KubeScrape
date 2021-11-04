/**
 * ************************************
 *
 * @module  cluster-promql-requests
 * @description contains functions that fetch and return data about the cluster from the Prometheus server
 *
 * ************************************
 */

//return the cpu usage percentage at the cluster level
export const fetchClusterCpuUsage = async () => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=(1 - sum by (instance)(increase(node_cpu_seconds_total{mode="idle"}[5m])) / sum by (instance)(increase(node_cpu_seconds_total[5m])))*100', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const clusterCpuUsage= parseInt(data.data.result[0].value[1]);
  return clusterCpuUsage;  
}



//return the memory usage percentage at the cluster level
//kube_node_status_capacity tells how much memory is available to kubernetes
//kube_node_status_allocatable tells memory resources of a node available for scheduling
export const fetchClusterMemoryUsage = async() => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=(1-sum(kube_node_status_allocatable_memory_bytes)/sum(kube_node_status_capacity_memory_bytes))*100', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  const clusterMemoryUsage = data.data.result[0].value[1];
  console.log(clusterMemoryUsage)
  return clusterMemoryUsage;
}

//unreliable query: http://localhost:30000/api/v1/query?query=((sum(node_memory_MemTotal_bytes)-sum(node_memory_MemFree_bytes)-sum(node_memory_Buffers_bytes)-sum(node_memory_Cached_bytes))/sum(node_memory_MemTotal_bytes))


//return the total number of nodes created in the cluster
export const fetchTotalNodes = async () => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=count(kube_node_created)', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const totalNodes = data.data.result[0].value[1];
  return totalNodes;  
}

//return the total number of deployments created in the cluster
export const fetchTotalDeployments = async () => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=count(kube_deployment_created)', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const totalDeployments = data.data.result[0].value[1];
  return totalDeployments;  
}


//return the total number of pods created in the cluster
export const fetchTotalPods = async () => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=count(kube_pod_created)', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const totalPods = data.data.result[0].value[1];
  return totalPods;  
}

//return the total number of services in the cluster
export const fetchTotalServices = async () => {
  const data = await fetch('http://localhost:30000/api/v1/query?query=count(kube_service_created)', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const totalServices = data.data.result[0].value[1];
  return totalServices;  
}
