/**
 * 在 console 语句中增加位置信息的输出，形如：console.log('[18,0]', 111)
 */

import parser  from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
// import * as t from '@babel/types'; // 用来创建一些 AST 和判断 AST 的类型

const code = `function test(n) {
  let sq = n * n;
  console.log(sq);
}`;

const ast = parser.parse(code);

// If you are using native ESM, you need to use traverse.default instead of traverse (that's how Node.js' interop between ESM and CJS works).
const traverseImpl = traverse.default;

traverseImpl(ast, {
  visitor: {
    CallExpression(path, state) {
      const callee = path.node.callee;
      if (
        callee.object.name === 'console' &&
        ['log', 'info', 'error'].includes(callee.property.name)
      ) {
        const { line, column } = path.node.loc.start;
        const locationNode = types.stringLiteral( `[ ${line} , ${column} ]` );
        path.node.arguments.unshift(locationNode);      
      }
    },
  },
});

const generateImpl = generate.default;
const output = generateImpl(ast, {}, code);
console.log(output)
 
