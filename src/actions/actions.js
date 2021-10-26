import * as actionTypes from '../constants/actionTypes';

/*actions, which make calls to the Prometheus server*/

export default fetchNodeNames = async() => {
  const data = await fetch('http://localhost:9090/api/v1/query?query=kube_node_info', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  console.log(data);
  const result = data.data.result;
  const nodeNames = data.data.result[0].metric.node;
  // const nodeNames = result.map(result => {
  //   return result.metric.node;
  // })
  return nodeNames;
}