const timeFunction = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);
  const humanTimeFormat = dateObject.toLocaleTimeString();
  return humanTimeFormat;
}

export default timeFunction;