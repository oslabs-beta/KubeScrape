export const demoPodData = `{
  "status": "success",
  "data": {
  "resultType": "vector",
  "result": [
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "<none>",
  "created_by_name": "<none>",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "storage-provisioner",
  "pod_ip": "10.1.2.8",
  "uid": "177349b2-b326-4200-9b5c-7ff6c957c673"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "<none>",
  "created_by_name": "<none>",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "vpnkit-controller",
  "pod_ip": "10.1.2.1",
  "uid": "629e250a-b5b5-42ad-aeae-b60499a16645"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "DaemonSet",
  "created_by_name": "kube-proxy",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "kube-proxy-w9hjr",
  "pod_ip": "192.168.65.4",
  "priority_class": "system-node-critical",
  "uid": "8b83417c-0eaf-4da6-9869-0784de7f1996"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "DaemonSet",
  "created_by_name": "node-exporter",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "monitoring",
  "node": "docker-desktop",
  "pod": "node-exporter-k5p4q",
  "pod_ip": "10.1.2.2",
  "uid": "f31c6bb1-e4dd-4c07-99c9-41de81bb20b0"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "Job",
  "created_by_name": "ingress-nginx-admission-create",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "ingress-nginx",
  "node": "docker-desktop",
  "pod": "ingress-nginx-admission-create-979s7",
  "pod_ip": "10.1.0.149",
  "uid": "b311438f-182c-4486-bba6-57b8572a1d06"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "Job",
  "created_by_name": "ingress-nginx-admission-patch",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "ingress-nginx",
  "node": "docker-desktop",
  "pod": "ingress-nginx-admission-patch-btk8z",
  "pod_ip": "10.1.0.148",
  "uid": "35352dc9-0f4f-452d-a6b4-ad52ae7c4143"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "Node",
  "created_by_name": "docker-desktop",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "etcd-docker-desktop",
  "pod_ip": "192.168.65.4",
  "priority_class": "system-node-critical",
  "uid": "bdb22b77-8db5-42f2-a4c5-694d90a5f39f"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "Node",
  "created_by_name": "docker-desktop",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "kube-apiserver-docker-desktop",
  "pod_ip": "192.168.65.4",
  "priority_class": "system-node-critical",
  "uid": "d1307f76-70e3-4b51-918d-40474567a207"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "Node",
  "created_by_name": "docker-desktop",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "kube-controller-manager-docker-desktop",
  "pod_ip": "192.168.65.4",
  "priority_class": "system-node-critical",
  "uid": "8ecd71c0-4670-4c75-8ae9-d6b9777c35d8"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "Node",
  "created_by_name": "docker-desktop",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "kube-scheduler-docker-desktop",
  "pod_ip": "192.168.65.4",
  "priority_class": "system-node-critical",
  "uid": "b2875258-7c44-4888-867f-4c401a5b5148"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "client-depl-6cd94bf874",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "default",
  "node": "docker-desktop",
  "pod": "client-depl-6cd94bf874-dx2ms",
  "pod_ip": "10.1.2.16",
  "uid": "567a1c5c-e03e-4437-8b52-affd851deb1d"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "comments-depl-856c66b899",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "default",
  "node": "docker-desktop",
  "pod": "comments-depl-856c66b899-54w9n",
  "pod_ip": "10.1.2.17",
  "uid": "d12dde19-2545-414b-9a91-fe76d12993f6"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "coredns-558bd4d5db",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "coredns-558bd4d5db-kprkc",
  "pod_ip": "10.1.2.10",
  "priority_class": "system-cluster-critical",
  "uid": "1c012679-cf6b-4d0b-a5c5-1d444f0b5b21"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "coredns-558bd4d5db",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "coredns-558bd4d5db-zq5rr",
  "pod_ip": "10.1.2.4",
  "priority_class": "system-cluster-critical",
  "uid": "8fc5c1d8-1a30-4fb0-99a5-7a5fc34e1a6a"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "dashboard-metrics-scraper-6ddd77bc75",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kubernetes-dashboard",
  "node": "docker-desktop",
  "pod": "dashboard-metrics-scraper-6ddd77bc75-xvzpm",
  "pod_ip": "10.1.2.13",
  "uid": "2d83b460-ce71-4618-9c72-33cb4e0048d6"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "event-bus-depl-648467ff4d",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "default",
  "node": "docker-desktop",
  "pod": "event-bus-depl-648467ff4d-nkjf2",
  "pod_ip": "10.1.2.15",
  "uid": "4ff33042-4b83-417c-820e-0b56b9f401bb"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "ingress-nginx-controller-5c8d66c76d",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "ingress-nginx",
  "node": "docker-desktop",
  "pod": "ingress-nginx-controller-5c8d66c76d-xgt9j",
  "pod_ip": "10.1.2.9",
  "uid": "0ed85a36-1f26-470d-bfe8-07f509514615"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "kube-state-metrics-6db9fb74f4",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "kube-state-metrics-6db9fb74f4-mkg4z",
  "pod_ip": "10.1.2.14",
  "uid": "66d76707-409f-4cee-a706-1e8b28c678c4"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "kubernetes-dashboard-6f76d57f57",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kubernetes-dashboard",
  "node": "docker-desktop",
  "pod": "kubernetes-dashboard-6f76d57f57-zw58r",
  "pod_ip": "10.1.2.5",
  "uid": "2b43a253-dd02-4996-8304-00ab530eb2f2"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "metrics-server-7b9c4d7fd9",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "kube-system",
  "node": "docker-desktop",
  "pod": "metrics-server-7b9c4d7fd9-zkr6m",
  "pod_ip": "10.1.2.3",
  "priority_class": "system-cluster-critical",
  "uid": "4d0ebca4-9cde-4f56-b98d-7508df44fb06"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "moderation-depl-64bd9b5c9f",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "default",
  "node": "docker-desktop",
  "pod": "moderation-depl-64bd9b5c9f-fbfsr",
  "pod_ip": "10.1.2.20",
  "uid": "c2dae855-a1a4-4068-bc5a-b0cf0577ace5"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "posts-depl-66f4cf7589",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "default",
  "node": "docker-desktop",
  "pod": "posts-depl-66f4cf7589-d2n6q",
  "pod_ip": "10.1.2.19",
  "uid": "1cb0c91e-b4b7-4a37-a581-e89a0f535b96"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "prometheus-deployment-599bbd9457",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "monitoring",
  "node": "docker-desktop",
  "pod": "prometheus-deployment-599bbd9457-xsj58",
  "pod_ip": "10.1.2.12",
  "uid": "e394188d-4ac3-45c3-962b-103e6ab4ee7a"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "ReplicaSet",
  "created_by_name": "query-depl-58c5cb87f5",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "default",
  "node": "docker-desktop",
  "pod": "query-depl-58c5cb87f5-65n4x",
  "pod_ip": "10.1.2.18",
  "uid": "269c7c34-1e9a-491e-9d4e-b425b47d7c4f"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "StatefulSet",
  "created_by_name": "alertmanager-main",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "monitoring",
  "node": "docker-desktop",
  "pod": "alertmanager-main-0",
  "pod_ip": "10.1.2.7",
  "uid": "72b979e8-cddf-427b-9dfc-70dddcef10c2"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "StatefulSet",
  "created_by_name": "alertmanager-main",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "monitoring",
  "node": "docker-desktop",
  "pod": "alertmanager-main-1",
  "pod_ip": "10.1.2.6",
  "uid": "e5b818d8-c985-4af1-a49c-3045304f973e"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "StatefulSet",
  "created_by_name": "alertmanager-main",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "monitoring",
  "node": "docker-desktop",
  "pod": "alertmanager-main-2",
  "pod_ip": "10.1.2.11",
  "uid": "dcdf093e-629d-44ad-8bd2-beeb92c16a7b"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "StatefulSet",
  "created_by_name": "prometheus-k8s",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "monitoring",
  "node": "docker-desktop",
  "pod": "prometheus-k8s-0",
  "uid": "8995f96a-f74b-4ea4-941b-b32feac929c7"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  },
  {
  "metric": {
  "__name__": "kube_pod_info",
  "created_by_kind": "StatefulSet",
  "created_by_name": "prometheus-k8s",
  "host_ip": "192.168.65.4",
  "instance": "kube-state-metrics.kube-system.svc.cluster.local:8080",
  "job": "kube-state-metrics",
  "namespace": "monitoring",
  "node": "docker-desktop",
  "pod": "prometheus-k8s-1",
  "uid": "20da5a61-37c8-4cb2-9242-c31c0869407c"
  },
  "value": [
  1635709805.273,
  "1"
  ]
  }
  ]
  }
  }`