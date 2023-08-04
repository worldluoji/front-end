
/*
Some native JavaScript objects have properties called internal slots, 
which are not accessible from JavaScript code. 
For example, Map objects have an internal slot called [[MapData]], which stores the key-value pairs of the map. 
As such, you cannot trivially create a forwarding proxy for a map:
*/
const proxy2 = new Proxy(new Map(), {});
console.log(proxy2.size); // TypeError: get size method called on incompatible Proxy

/*
Internal slots correspond to internal state that is associated with objects and used by various ECMAScript specification algorithms. 
Internal slots are not object properties and they are not inherited. 
Depending upon the specific internal slot specification, such state may consist of values of any ECMAScript language type or of specific ECMAScript specification type values. 
Unless explicitly specified otherwise, internal slots are allocated as part of the process of creating an object and may not be dynamically added to an object. 
Unless specified otherwise, the initial value of an internal slot is the value undefined. 
Various algorithms within this specification create objects that have internal slots. 
However, the ECMAScript language provides no direct way to associate internal slots with an object.

All objects have an internal slot named [[PrivateElements]], which is a List of PrivateElements. 
This List represents the values of the private fields, methods, and accessors for the object. Initially, it is an empty List.

Internal methods and internal slots are identified within this specification using names enclosed in double square brackets [[ ]].

https://tc39.es/ecma262/#sec-object-internal-methods-and-internal-slots
*/