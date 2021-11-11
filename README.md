<p align="center">
 <img src="https://i.imgur.com/763iZTq.jpg" width="300" height="240"></p>
<h1 align="center"><strong>KubeScrape</strong></h1>

<p align="center">An open source real-time Kubernetes visualizer with easy to read metrics, graphs, and diagrams </p>

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"/>
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"/>
  <img alt="license" src="https://img.shields.io/github/license/oslabs-beta/KubeScrape?color=%2357d3af">
  <img alt="last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/KubeScrape?color=%2357d3af">
  <img alt="Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/KubeScrape?logoColor=%2334495e&style=social"> 
</p>

## Table of Contents 

* [What is KubeScrape](#KubeScrape)
* [KubeScrape Prerequisite and Set Up](#setUp)
* [Features](#feature)
* [KubeScrape Engineering Team ](#team)
* [License](#license)

## What is KubeScrape 

## KubeScrape Prerequisite and Installation
### Application Installation
&nbsp;&nbsp; Installing our app is just a few clicks away! Vist our [github releases page](URL) to download KubeScrape's desktop application. Please be sure to select the required executable that is compatiable with your operating system.

*Note: You may need to configure privacy or security settings to allow the application to open without being verified.*

### Prerequisites
#### Required
1. The following must be deployed in your kubernetes cluster for KubeScrape to gather metrics and information from:
   - Prometheus 
   - Node Exporter
   - Kube-state-metrics
2. If you have your own instance of prometheus installed, please expose it to `port 30000` as KubeScrape currently makes API calls to this port.

*As an enhancement, we are looking to allow users to input the port which you are running Prometheus on.*

#### Optional
&nbsp;&nbsp; KubeScrape's alerts tab will only showcase alert details if Prometheus alert rules are configured. However, the application will still display other details regarding your kubernetes cluster even if alert rules are not implemented.
  
#### I need help installing Prometheus, node exporter, or kube-state-metrics
&nbsp;&nbsp; If you do not have the above requirements set up please go to the following repo which includes sample manifest files for Prometheus (including alert rules), node exporter, and kube-state-metrics. Follow the 4-step process in the ReadMe to deploy Prometheus with ease. 
   [KubeScrape_PrometheusManifests](https://github.com/annechanchan/KubeScrape_PrometheusManifests#kubescrape_prometheusmanifests-overview)  

## Features
### Cluster View / Home Page
&nbsp;&nbsp; Dashboard that displays an overview of the cluster including over health and details about the created k8 objects. Hover and click into the running nodes component to automatically route to the Node Details page for more information regarding running pods. 

<gif>

### Node Details
&nbsp;&nbsp; Provides details regarding created pods within the node. Hover and click into a pod to route to the Pod Details for pod metrics.
 
### Pod Details
&nbsp;&nbsp; Displays metrics regarding each pod. Click the drop down menu on the top right to switch between pods.
 
### Alerts 
&nbsp;&nbsp; Displays alerts tracked by Prometheus that are in "firing state". The alert components are grouped by alert name and changes color depending on severity level. 
 
### K8 Visualizer 
&nbsp;&nbsp; Presents a relational diagram of your kubernetes cluster. 

## KubeScrape Engineering Team 
[Anne Chan](https://github.com/annechanchan) | [Jackie Whitman](https://github.com/jackiewhitworth) | [Jacob Davis](https://github.com/JacobDDavis) | [Vince Nguyen](https://github.com/ntgv93)

We welcome any feedback, contributions, or suggestions to improve KubeScrape to help monitor your cluster better. So please feel free to fork, clone this repo, and
leave a [![GitHub stars](https://img.shields.io/github/stars/oslabs-beta/KubeScrape?style=social&label=Star&)](https://github.com/oslabs-beta/KubeScrape/) if you would like to support our work!

## Future Enhancements

## License
Released under the MIT License
