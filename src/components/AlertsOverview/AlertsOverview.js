/**
 * ************************************
 *
 * @module  AlertsOverview
 * @description component that renders basic information about the user's cluster
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Container, Typography, Paper } from '@mui/material';

const primaryColor = '#25274D';

// helper function 1: consolidates all alert details from API fetch request into a 1 layer key/value pair of the alert details and groups them by alertname
function consolidateAlerts(dataArray) {
  const resultObj = {};

  // if there are any alerts recieved from the fetch request, iterate through each element of the request, and add the details into the resultObj (making the details 1 layer of key/value pairs)
  if (dataArray.length) {
    dataArray.forEach(el => {
      const alertName = el.labels.alertname;
      const alertDetailsObj = {};

      // if alertname does not exist in resultObj add alertname as the key and set the value to an empty array
      if (!resultObj[alertName]) {
        resultObj[alertName] = [];
      }

      // add alert query "active at", and "state" into the alertDetails Obj
      const formattedDate = new Date(el.activeAt);
      // alertDetailsObj['Active At'] = `${formattedDate.toLocaleString('en-US', {
      //   timeZone: 'America/New_York',
      // })} EST`;
      alertDetailsObj['Active At'] = formattedDate.toLocaleString();

      alertDetailsObj.State = el.state;

      // add each property in the alert query "annotations" section into the alertDetails Obj
      for (const [key, value] of Object.entries(el.annotations)) {
        // replace dashes and underscores in the key with a space
        let keyUpdate = key.replace(/[_-]/g, ' ');
        // captialize each first character of the word in the key
        //^\w{1} macthes the first letter of the word, | means or, \s+ matches the amt of whitespaces between words
        keyUpdate = keyUpdate.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

        alertDetailsObj[keyUpdate] = value;
      }

      // add each property in the alert query "labels" section except for 'alertname' properties as this will be leveraged as the title for each alert container
      for (const [key, value] of Object.entries(el.labels)) {
        let keyUpdate = key.replace(/[_-]/g, ' ');
        keyUpdate = keyUpdate.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

        if (key !== 'alertname' && key !== 'value') {
          alertDetailsObj[keyUpdate] = value;
        }
      }

      // push the object of all other properties into the array corresponding to the alertname
      resultObj[alertName].push(alertDetailsObj);
    });
  }

  return resultObj;
}

// helper function #2
function createAlertDetails(el, alertName, i, boxColor) {
  const objCopy = el;

  // initialize an array to hold all of the detail paragraphs
  const alertDetails = [];
  if (objCopy.Summary) {
    alertDetails.push(<p key="Summary">Summary: {objCopy.Summary}</p>);
    delete objCopy.Summary;
  }
  if (objCopy.Description) {
    alertDetails.push(<p key="Description">Description: {objCopy.Description}</p>);
    delete objCopy.Description;
  }

  if (Object.keys(objCopy).length !== 0) {
    // iterate through the rest of the key/value pairs within the element
    for (const key in objCopy) {
      alertDetails.push(
        <p key={key}>
          {key}: {objCopy[key]}
        </p>
      );
    }
  }

  return (
    <AlertDetailsBox keyProps={alertName + i} alertDetails={alertDetails} boxColor={boxColor} />
  );
}

// styling for each individual box for alerts
const AlertDetailsBox = props => {
  return (
    <Box
      sx={{
        backgroundColor: props.boxColor,
        maxWidth: '30%',
        color: '#292020',
        fontSize: '0.75rem',
        borderRadius: '5px',
        padding: '5px 15px',
        margin: '10px 10px 0px 10px',
      }}
      key={props.keyProps}
    >
      {props.alertDetails}
    </Box>
  );
};

// return all alerts with "firing" status
const fetchAlert = async () => {
  const dataObj = await fetch('http://localhost:30000/api/v1/alerts', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  // this container will be returned to the useEffect method (it will either send back a message letting the user know there are no alerts or contain an array of elements with the alert details)
  const alertContainer = [];
  let dataArray;

  if (Object.keys(dataObj.data.alerts).length !== 0) {
    // reassign dataArray
    dataArray = dataObj.data.alerts;
  } else {
    alertContainer.push(
      <h2 key="noAlerts" style={{ textAlign: 'center' }}>
        No Alert Details To Display Based on Current Prometheus Alert Rules
      </h2>
    );
    return alertContainer;
  }

  // invoke helper function 1 to consolidate all alerts recieved from the fetch request. This returns an object
  const alertObj = consolidateAlerts(dataArray);

  // if the alertObj does not come back empty, then create a container for each unique alertName
  if (Object.keys(alertObj).length !== 0) {
    for (const [alertName, value] of Object.entries(alertObj)) {
      // For each element in the alertName array, create a component with all of the alert details
      const alertDetailsArray = value.map((el, i) => {
        let boxColor = '#b0b5f8';

        if (el.Severity === 'critical') {
          // if the severity is equal to critical, change background color to light red
          boxColor = '#fca6a6be';
        } else if (el.Severity === 'warning') {
          // else if the severisty if equal is warning, background color is yellow
          boxColor = '#f8f0a8d5';
        }

        return createAlertDetails(el, alertName, i, boxColor);
      });

      alertContainer.push(
        <Paper elevation={5} key={alertName}>
          <Container
            sx={{
              maxWidth: '98%',
              backgroundColor: primaryColor,
              display: 'box-sizing',
              borderRadius: '5px',
              padding: '10px 25px',
              margin: '15px',
            }}
          >
            <h3>{alertName}</h3>
            <Box sx={{ display: 'flex', marginBottom: '40px' }}>
              {alertDetailsArray}
              {/* {alertDetailsArray} */}
            </Box>
          </Container>
        </Paper>
      );
    }
  }

  return alertContainer;
};

// fetch alerts from the query
const AlertsOverview = () => {
  const [allAlerts, setAllAlerts] = useState([]);

  useEffect(async () => {
    const currentAlerts = await fetchAlert();
    setAllAlerts(currentAlerts);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Alerts
          </Typography>
        </Toolbar>
      </AppBar>
      {allAlerts}
    </Box>
  );
};

export default AlertsOverview;
