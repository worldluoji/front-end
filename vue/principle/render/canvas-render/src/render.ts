
import { createRenderer, RendererElement } from '@vue/runtime-core'
import { RendererNode } from '@vue/runtime-dom'

const CanvasStarter = (ctx: CanvasRenderingContext2D) => createRenderer<RendererNode, RendererElement>({
  insert: (child, parent, anchor) => {
    if (typeof child === 'string') {
      parent.text = child
    } else {
      child.parent = parent
      if (!parent.child) {
        parent.child = [child]
      } else {
        parent.child.push(child)
      }
    }
    if (parent.nodeName) {
      draw(child, false, ctx)
      if (child.onClick && ctx != null) {
        ctx.canvas.addEventListener('click', () => {
          child.onClick()
          setTimeout(() => {
            draw(child, false, ctx)
          })
        })
      }
    }
  },
  createElement (type, isSVG, isCustomizedBuiltIn, vnnodePros?): RendererElement {
    return {
      type: type
    }
  },
  setElementText (node, text) {
    node.text = text
  },
  patchProp (el, key, prev, next) {
    el[key] = next
  },
  remove: function (el: RendererNode): void {
    throw new Error('Function not implemented.')
  },
  createText: function (text: string): RendererNode {
    throw new Error('Function not implemented.')
  },
  createComment: function (text: string): RendererNode {
    throw new Error('Function not implemented.')
  },
  setText: function (node: RendererNode, text: string): void {
    throw new Error('Function not implemented.')
  },
  parentNode: function (node: RendererNode): RendererElement | null {
    console.log(node)
    return node == null ? null : node.parent
  },
  nextSibling: function (node: RendererNode): RendererNode | null {
    return node == null ? null : node.nextSibling
  }
})

function draw (ele: RendererNode, isChild: boolean, ctx: CanvasRenderingContext2D) {
  if (ctx == null) {
    throw new Error('fail to get canvas context')
  }

  if (!isChild) {
    ctx.clearRect(0, 0, 500, 500)
  }

  ctx.fillStyle = ele.fill || 'white'
  ctx.fillRect(ele.pos[0], ele.pos[1], ele.pos[2], ele.pos[3])

  if (ele.text) {
    ctx.fillStyle = ele.color || 'white'
    ele.fontSize = ele.type === 'h1' ? 20 : 12
    ctx.font = (ele.fontSize || 18) + 'px serif'
    ctx.fillText(ele.text, ele.pos[0] + 10, ele.pos[1] + ele.fontSize)
  }
  // 这里我们就是用 Canvas 的操作方法递归地把 Canvas 对象渲染到 Canvas 标签内部
  ele.child && ele.child.forEach((c: any) => {
    console.log('child:::', c)
    draw(c, true, ctx)
  })
}

export default CanvasStarter
