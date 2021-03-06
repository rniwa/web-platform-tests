// META: script=constants.sub.js
// META: variant=
// META: variant=?wpt_flags=h2
// META: variant=?wss

var testOpen = async_test("Send null data on a WebSocket - Connection should be opened");
var testMessage = async_test("Send null data on a WebSocket - Message should be received");
var testClose = async_test("Send null data on a WebSocket - Connection should be closed");

var data = null;
var nullReturned = false;
var wsocket = CreateWebSocket(false, false);
var isOpenCalled = false;

wsocket.addEventListener('open', testOpen.step_func(function(evt) {
  wsocket.send(data);
  isOpenCalled = true;
  testOpen.done();
}), true);

wsocket.addEventListener('message', testMessage.step_func(function(evt) {
  if ("null" == evt.data || "" == evt.data)
    nullReturned = true;
  assert_true(nullReturned);
  wsocket.close();
  testMessage.done();
}), true);

wsocket.addEventListener('close', testClose.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_equals(evt.wasClean, true, "wasClean should be true");
  testClose.done();
}), true);
