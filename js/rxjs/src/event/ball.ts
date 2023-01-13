import { addDragCapability } from "./DragEventHandler"

const ball = document.getElementById('ball')
if (ball == null || ball.parentElement == null) {
  throw new Error('can not find ball element')
}

addDragCapability(ball)
