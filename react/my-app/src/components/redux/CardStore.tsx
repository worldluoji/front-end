
import { createSlice, configureStore } from '@reduxjs/toolkit'

export interface Card {
  title: string
}

interface CardAction {
  payload: Card,
  type: string
}

const cardListSlice = createSlice({
  name: 'cardList',
  initialState: [],
  reducers: {
    addCard(state: Card[], action: CardAction) {
      if (action.payload) {
        state.unshift(action.payload)
      }
    },
    removeCard(state: Card[], action: CardAction) {
      const index = state.findIndex(card => card.title === action.payload.title)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

export const { addCard, removeCard } = cardListSlice.actions

const store = configureStore({
  reducer: cardListSlice.reducer
})

store.subscribe(() => console.log(store.getState()))

export type CardListDispatch = typeof store.dispatch
export default store

