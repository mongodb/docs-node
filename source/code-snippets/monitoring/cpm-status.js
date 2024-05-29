function connectionPoolStatus(client) {
  let checkedOut = 0;

  function onCheckout() {
    checkedOut++;
  }

  function onCheckin() {
    checkedOut--;
  }

  function onClose() {
    client.removeListener('connectionCheckedOut', onCheckout);
    client.removeListener('connectionCheckedIn', onCheckin);

    checkedOut = NaN;
  }

  // Increases count of active connection pool threads when connectionCheckedIn event is triggered
  client.on('connectionCheckedIn', onCheckin);

  // Decreases count of active connection pool threads when connectionCheckedOut event is triggered
  client.on('connectionCheckedOut', onCheckout);

  // Cleans up event listeners when client is closed
  client.on('close', onClose);

  return {
    count: () => checkedOut,
    cleanUp: onClose
  };
}