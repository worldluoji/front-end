# attributes and properties
When writing HTML source code, you can define attributes on your HTML elements. 
Then, once the browser parses your code, a corresponding DOM node will be created. 
This node is an object, and therefore it has properties.

For instance, this HTML element:
```
<input type="text" value="Name:">
```
has 2 attributes (type and value).

Once the browser parses this code, a HTMLInputElement object will be created, 
and this object will contain dozens of properties like: accept, accessKey, align, alt, attributes, autofocus, baseURI, checked, childElementCount, childNodes, children, classList, className, clientHeight, etc.

<br>

For a given DOM node object, properties are the properties of that object, 
and attributes are the elements of the attributes property of that object.

When a DOM node is created for a given HTML element, many of its properties relate to attributes with the same or similar names, 
but <strong>it's not a one-to-one relationship</strong>. For instance, for this HTML element:
```
<input id="the-input" type="text" value="Name:">
```
the corresponding DOM node will have id,type, and value properties (among others):

<strong>The id property is a reflected property for the id attribute: Getting the property reads the attribute value</strong>,
and setting the property writes the attribute value. id is a pure reflected property, it doesn't modify or limit the value.

The type property is a reflected property for the type attribute: Getting the property reads the attribute value, and setting the property writes the attribute value. 
type isn't a pure reflected property because it's limited to known values (e.g., the valid types of an input).

If you had `<input type="foo">`, then theInput.getAttribute("type") gives you "foo" but theInput.type gives you "text".

In contrast, the value property doesn't reflect the value attribute. 
Instead, it's the current value of the input. When the user manually changes the value of the input box, the value property will reflect this change. 
So if the user inputs "John" into the input box, then:
```
theInput.value // returns "John"
```
whereas:
```
theInput.getAttribute('value') // returns "Name:"
```
The value property reflects the current text-content inside the input box, 
whereas the value attribute contains the initial text-content of the value attribute from the HTML source code.

So if you want to know what's currently inside the text-box, read the property. 
If you, however, want to know what the initial value of the text-box was, read the attribute. 
Or you can use the defaultValue property, which is a pure reflection of the value attribute:
- theInput.value                 // returns "John"
- theInput.getAttribute('value') // returns "Name:"
- theInput.defaultValue          // returns "Name:"

There are several properties that directly reflect their attribute (rel, id), 
some are direct reflections with slightly-different names (htmlFor reflects the for attribute, className reflects the class attribute), 
many that reflect their attribute but with restrictions/modifications (src, href, disabled, multiple), and so on. 
The spec covers the various kinds of reflection.