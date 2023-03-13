# AST
Babel uses an AST modified from ESTree
```
function square(n) {
  return n * n;
}
```
-> AST
```
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  params: [{
    type: "Identifier",
    name: "n"
  }],
  body: {
    type: "BlockStatement",
    body: [{
      type: "ReturnStatement",
      argument: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "n"
        },
        right: {
          type: "Identifier",
          name: "n"
        }
      }
    }]
  }
}
```
You'll notice that each level of the AST has a similar structure.
```
{
  type: "FunctionDeclaration",
  id: {...},
  params: [...],
  body: {...}
}
``
Each of these are known as a Node. 
An AST can be made up of a single Node, or hundreds if not thousands of Nodes. 
Together they are able to describe the syntax of a program that can be used for static analysis.