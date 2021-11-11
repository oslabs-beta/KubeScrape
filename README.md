<p align="center">
 <img src="https://i.imgur.com/763iZTq.jpg" width="300" height="240"></p>
<h1 align="center"><strong>KubeScrape</strong></h1>

<p align="center">An open source dev tool that provides an intuitive way to view the health, structure, and live metrics of your Kubernetes cluster </p>

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"/>
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"/>
  <img alt="license" src="https://img.shields.io/github/license/oslabs-beta/KubeScrape?color=%2357d3af">
  <img alt="last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/KubeScrape?color=%2357d3af">
  <img alt="Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/KubeScrape?logoColor=%2334495e&style=social"> 
</p>

## Table of Contents 
- [What is KubeScrape](#what-is-kubescrape)
- [Installation and Prerequisites](#installation)
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [Engineering Team](#engineering)
- [License](#license)

## What is KubeScrape 
KubeScape is an open source monitoring tool designed and developed to help Kubernetes users track the health, view live metrics, and view structure of the Kubernetes cluster. The application currently has 5 easy to navigate and intutive pages (see features section for an overview of each page). 

## Installation and Prerequisites
### Application Installation
&nbsp;&nbsp;&nbsp;&nbsp; Installing our app is just a few clicks away! Vist our [github releases page](URL) to download KubeScrape's desktop application. Please be sure to select the required executable that is compatiable with your operating system. *Note: You may need to configure privacy or security settings to allow the application to open without being verified.*

### Prerequisites
#### I have Prometheus installed
1. (Required) The following must be deployed in your kubernetes cluster for KubeScrape to gather metrics and information from:
   - Prometheus 
   - Node Exporter
   - Kube-state-metrics
2. (Required) If you have your own instance of prometheus installed, please expose it to `port 30000` as KubeScrape currently makes API calls to this port. *As an enhancement, we are looking to allow users to input the port which you are running Prometheus on.*
3. (Optional) KubeScrape's alerts tab will only showcase alert details if Prometheus alert rules are configured. However, the application will still display other details regarding your kubernetes cluster even if alert rules are not implemented.
  
#### [I need help installing Prometheus, node exporter, or kube-state-metrics](https://github.com/annechanchan/KubeScrape_PrometheusManifests#kubescrape_prometheusmanifests-overview)  
&nbsp;&nbsp;&nbsp;&nbsp; If you do not have the above requirements set up please go to the following repo which includes sample manifest files for Prometheus (including alert rules), node exporter, and kube-state-metrics. Follow the 4-step process in the ReadMe to deploy Prometheus with ease. 

Supplementary Repo: [KubeScrape_PrometheusManifests](https://github.com/annechanchan/KubeScrape_PrometheusManifests#kubescrape_prometheusmanifests-overview)  

## Features

### Cluster View / Home Page
&nbsp;&nbsp; The Cluster View, or Home Page, presents an overview of the cluster's health and important cluster metrics/information. Hover and click on a node to automatically route to the Node Details page for more information regarding running pods. 

### Node Details
&nbsp;&nbsp;&nbsp;&nbsp; The Node Details page displays basic information about running pods within the selected node. Hover and click on a pod to route to the Pod Details for pod metrics.

 
### Pod Details
&nbsp;&nbsp;&nbsp;&nbsp; The Pod Details page graphically displays CPU Usage, CPU Saturation, Memory Usage, and Memory Saturation for each container of the selected pod. Click the drop down menu on the top right to switch between pods.

 
### Alerts 
&nbsp;&nbsp;&nbsp;&nbsp; The Alerts page displays alerts tracked by Prometheus that are in "firing state". The alert components are grouped by alert name and changes color depending on the set severity level. 

  
### K8 Visualizer 
&nbsp;&nbsp;&nbsp;&nbsp; The Visualizer presents a relational diagram of your kubernetes cluster objects, organized by namespace. 
    
## Future Enhancements
  - Implementing additional metrics and visualizations for nodes, pods, and containers (suggestions welcomed)
  - Integrate an error logs to allow for more comprehensive cluster debugging
  - Support start, stop, and remove objects
  - Ability to filter pods and deployments by namespace
    
## KubeScrape Engineering Team 
    
We welcome any feedback, contributions, or suggestions to improve KubeScrape to help monitor your cluster better. So please feel free to fork, clone this repo, and
leave a [![GitHub stars](https://img.shields.io/github/stars/oslabs-beta/KubeScrape?style=social&label=Star&)](https://github.com/oslabs-beta/KubeScrape/) if you would like to support our work!
 
[Anne Chan](https://github.com/annechanchan) | [Jackie Whitman](https://github.com/jackiewhitworth) | [Jacob Davis](https://github.com/JacobDDavis) | [Vince Nguyen](https://github.com/ntgv93)

 
## License
Released under the MIT License
