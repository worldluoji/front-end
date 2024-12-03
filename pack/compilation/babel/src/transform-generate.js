import parser  from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

/**
 * 下面的例子中，通过识别标识符把 "n" 换成了 "x"，其中的 path 是遍历过程中的路径，会保留上下文信息，有很多属性和方法，
 * 可以在访问到指定节点后，根据 path 进行自定义操作，比如：
 *  path.node 指向当前 AST 节点，path.parent 指向父级 AST 节点；
 *  path.getSibling、path.getNextSibling、path.getPrevSibling 获取兄弟节点；
 *  path.isxxx 判断当前节点是不是 xx 类型；
 *  path.insertBefore、path.insertAfter 插入节点；
 *  path.replaceWith、path.replaceWithMultiple、replaceWithSourceString 替换节点；
 *  path.skip 跳过当前节点的子节点的遍历，path.stop 结束后续遍。
 * 
 * 有了 @babel/traverse 我们可以在 tranform 阶段做很多自定义的事情，例如删除 console.log 语句，在特定的地方插入一些表达式等等，从而影响输出结果
*/
const code = `function square(n) {
  return n * n;
}`;
const ast = parser.parse(code);

const traverseImpl = traverse.default;
traverseImpl(ast, {
  enter(path) {
    if (path.isIdentifier({
        name: "n"
      })) {
      path.node.name = "x";
    }
  },
  FunctionDeclaration: {
    enter() {
      console.log('enter function declaration')
    },
    exit() {
      console.log('exit function declaration')
    }
  }
});

const generateImpl = generate.default;
const output = generateImpl(ast, {}, code);
console.log(output)