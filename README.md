<!--need to add a static folder if we would like to upload an image to our readme--> Add photo of Logo, will need to add a folder and upload images to this repo though
<!-- <p align="center">
 <img src="./static/KubeScrape.png" width="800" height="400"></p>
<h1 align="center"><strong>KubeScrape</strong></h1> -->

<p align="center">An open source visualizer with easy to read metrics, graphs, and diagrams for your Kubernetes Cluster</p>

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

<a name="KubeScrape"/>
## What is KubeScrape 

<a name="setUp"/>
## KubeScrape Prerequisite and Set Up
  ###### Prerequisite
  KubeScrape relies on the following instances to deployed in your kubernetes cluster to scrape metrics and information from:
  - Prometheus 
  - Node Exporter
  - Kube-state-metrics
  In addition, KubeScrape's alerts tab will only showcase alert details if Prometheus alert.rules are configured within your Prometheus instance. *If no rules are configured, the application will still provide data regarding your cluster*

  Please note that KubeScrape makes API calls to `port 30000` and configure Prometheus to 
  
  If you do not have the above requirements set up please go to the following repo which includes manifest files for Prometheus (including alert rules), node exporter, and kube-state-metrics. Follow the easy 4 step process in its ReadMe to deploy Prometheus. 
   [KubeScrape_PrometheusManifests](https://github.com/annechanchan/KubeScrape_PrometheusManifests#kubescrape_prometheusmanifests-overview)
  
  ###### Application Set Up

<a name="feature"/>
## Features
  ###### Home/Cluster View 
  ###### Node View 
  ###### Pod View 
  ###### Alerts 
  ###### K8 Map

<a name="team"/>
## KubeScrape Engineering Team 
[Anne Chan](https://github.com/annechanchan) | [Jackie Whitman](https://github.com/jackiewhitworth) | [Jacob Davis](https://github.com/JacobDDavis) | [Vince Nguyen](https://github.com/ntgv93)

We appreciate any feedback, contributions, or suggestions to improve KubeScrape to help monitor your cluster better. Please feel free to fork and clone this repo.
Remember to leave a [![GitHub stars](https://img.shields.io/github/stars/oslabs-beta/KubeScrape?style=social&label=Star&)](https://github.com/oslabs-beta/KubeScrape/).

<a name="license"/>
## License
Released under the MIT License
