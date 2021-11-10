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
  ### Prerequisite
  KubeScrape relies on Prometheus, Kube-State_Metrics, and Node-Export instances deployed in their cluster to scrape metrics from your cluster. The alerts tab requires Prometheus alert.rules to be implemented within your Prometheus instance. 
  
  If you do not have these set up please go to the below repo and follow the steps in the ReadMe to set up Prometheus on your cluster: 
   [KubeScrape_PrometheusManifests](https://github.com/annechanchan/KubeScrape_PrometheusManifests#kubescrape_prometheusmanifests-overview)
  
  ### Application Set Up

<a name="feature"/>
## Features
  ### Home/Cluster View 
  ### Node View 
  ### Pod View 
  ### Alerts 
  ### K8 Map

<a name="team"/>
## KubeScrape Engineering Team 
[Anne Chan](https://github.com/annechanchan) | [Jackie Whitman](https://github.com/jackiewhitworth) | [Jacob Davis](https://github.com/JacobDDavis) | [Vince Nguyen](https://github.com/ntgv93)

We appreciate any feedback, contributions, or suggestions to improve KubeScrape to help monitor your cluster better. Please feel free to fork and clone this repo.
Remember to leave a [![GitHub stars](https://img.shields.io/github/stars/oslabs-beta/KubeScrape?style=social&label=Star&)](https://github.com/oslabs-beta/KubeScrape/).

<a name="license"/>
## License
Released under the MIT License
