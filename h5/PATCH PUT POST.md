# PATCH PUT POST
1. The HTTP PATCH request method applies <strong>partial modifications</strong> to a resource.
A PATCH is not necessarily idempotent, although it can be. 
Contrast this with PUT; which is always idempotent.

2. The HTTP PUT request method <strong>creates a new resource or replaces</strong> a representation of 
the target resource with the request payload.

3. The HTTP POST method <strong>sends data(or create data)</strong> to the server. 
The type of the body of the request is indicated by the Content-Type header.

The difference between PUT and POST is that PUT is idempotent: calling it once or several times successively has the same effect (that is no side effect), 
where successive identical POST may have additional effects, like passing an order several times.

reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST