import { fromEvent } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'

const ball = document.getElementById('ball')
if (ball == null) {
    throw new Error('can not find ball element')
}

function getMouseEventPos(event: MouseEvent) {
  // console.log('mouse move: ', event.clientX, event.clientY)
  return {
    x: event.clientX,
    y: event.clientY
  };
}

const mousedown$ = fromEvent<MouseEvent>(ball, 'mousedown').pipe(
  map(getMouseEventPos)
)

const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
  map(getMouseEventPos)
)

const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup')

const drag$ = mousedown$.pipe(
  switchMap(initialPos => {
    // 相对父容器的偏移量
    const top = ball.offsetTop;
    const left = ball.offsetLeft;
    // const { top, left } = ball.getBoundingClientRect() 不再使用可视宽度
    // console.log('enter in switch map', top, left);
    // console.log(0, ball.parentElement?.clientWidth)
    const parentWidth = ball.parentElement?.clientWidth
    const parentHeight = ball.parentElement?.clientHeight
    const currentWidth = ball.clientWidth
    const currentHeight = ball.clientHeight
    let lastTop: number | null = null
    let lastLeft: number | null = null
    const res = mousemove$.pipe(
      map(({ x, y }) => {
        const newTop = y - initialPos.y + top
        const newLeft = x - initialPos.x + left
        // 不允许超出父容器
        if ((parentHeight && ((newTop + currentHeight) > parentHeight)) ||
            (parentWidth && ((newLeft + currentWidth) > parentWidth)) ||
            (newTop < 0 || newLeft < 0)) {
          return {
            top: lastTop ? lastTop : top,
            left: lastLeft ? lastLeft : left
          }
        }

        // 到这里，说明是合理的，记录下来，以便不合理时会退
        lastTop = newTop
        lastLeft = newLeft
        return {
          top: newTop,
          left: newLeft
        }
      }),
      
      // 直到鼠标释放停止流
      takeUntil(mouseup$)
    )
    
    // res.forEach(r => {
    //   // 计算之后的top和left
    //   console.log(r.top, r.left)
    // })
  
    return res;
  })
)

drag$.subscribe(({ top, left }) => {
  ball.style.top = `${top}px`
  ball.style.left = `${left}px`
  ball.style.bottom = ''
  ball.style.right = ''
})
