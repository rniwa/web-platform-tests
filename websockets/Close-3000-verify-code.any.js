// META: script=constants.sub.js
// META: variant=
// META: variant=?wss
// META: variant=?wpt_flags=h2

var testOpen = async_test("Create WebSocket - Close the Connection - close(3000, reason) - Connection should be opened");
var testClose = async_test("Create WebSocket - Close the Connection - close(3000, reason) - verify return code is 3000 - Connection should be closed");

var wsocket = CreateWebSocket(false, false);
var isOpenCalled = false;

wsocket.addEventListener('open', testOpen.step_func(function(evt) {
  wsocket.close(3000, "Clean Close");
  isOpenCalled = true;
  testOpen.done();
}), true);

wsocket.addEventListener('close', testClose.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_equals(evt.code, 3000, "CloseEvent.code should be 3000");
  testClose.done();
}), true);
