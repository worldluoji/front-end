function wrapErrors(fn) {
    // don't wrap function more than once
    if (!fn.__wrapped__) {
        fn.__wrapped__ = function () {
            try {
                return fn.apply(this, arguments);
            } catch (e) {
                captureError(e); // report the error
                throw e; // re-throw the error
            }
        };
    }

    return fn.__wrapped__;
}
  
var invoke = wrapErrors(function(obj, method, args) {
    return obj[method].apply(this, args);
});

function captureError(ex) {
    var errorData = {
      name: ex.name, // e.g. ReferenceError
      message: ex.line, // e.g. x is undefined
      url: document.location.href,
      stack: ex.stack // stacktrace string; remember, different per-browser!
    };
  
    // 调接口上送
    // fetch('/log/error', {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //       'Content-Type': 'application/json'
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: JSON.stringify(errorData) // body data type must match "Content-Type" header
    // });
    console.log(errorData)
}

console.log(invoke(Math, 'max', [1, 2])); // returns 2  
invoke(Math, 'highest', [1, 2]); // no method Math.highest