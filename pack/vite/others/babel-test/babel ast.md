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
```
Each of these are known as a Node. 
An AST can be made up of a single Node, or hundreds if not thousands of Nodes. 
Together they are able to describe the syntax of a program that can be used for static analysis.

##  Stages of Babel 
The three primary stages of Babel are parse, transform, generate.

### Parse
The parse stage, takes code and outputs an AST. 
There are two phases of parsing in Babel: Lexical Analysis and Syntactic Analysis.

### Transform
The transform stage takes an AST and traverses through it, adding, updating, and removing nodes as it goes along. 
This is where plugins operated.

### Generate
The code generation stage takes the final AST and turns it back into a string of code, 
also creating source maps.

## reference
https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-asts