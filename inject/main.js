(function() {
  var TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

  var EVENT_TYPES_MAP = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup'
  };

  var touchHandler = function(evt) {
    if (!(evt.type in EVENT_TYPES_MAP)) {
      return;
    }

    var touches = evt.changedTouches;
    var first = touches[0];
    var type = EVENT_TYPES_MAP[evt.type];

    var simulatedEvent = document.createEvent('MouseEvent');
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                  first.screenX, first.screenY, 
                                  first.clientX, first.clientY, false, 
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    evt.preventDefault();
  }

  var setUp = function() {
    TOUCH_EVENTS.forEach(function(eventName) {
      document.addEventListener(eventName, touchHandler, true);
    });
  }

  window.addEventListener('load', setUp);
})();
