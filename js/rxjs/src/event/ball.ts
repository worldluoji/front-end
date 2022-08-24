import { fromEvent } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'

const ball = document.getElementById('ball')
if (ball == null) {
    throw new Error('can not find ball element')
}

function getMouseEventPos(event: MouseEvent) {
  console.log('mouse move: ', event.clientX, event.clientY)
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
    const { top, left } = ball.getBoundingClientRect()
    console.log('enter in switch map', top, left)
    return mousemove$.pipe(
      map(({ x, y }) => ({
        top: y - initialPos.y + top,
        left: x - initialPos.x + left
      })),
      
      // 直到鼠标释放停止流
      takeUntil(mouseup$)
    )
  })
)

drag$.subscribe(({ top, left }) => {
  ball.style.top = `${top}px`
  ball.style.left = `${left}px`
  ball.style.bottom = ''
  ball.style.right = ''
})
