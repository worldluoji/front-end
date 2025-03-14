import store from './CardStore'
import { Provider } from 'react-redux'
import CardList from './CardList'

export default function ReduxDemo() {
    return (
        <Provider store={store}>
            <CardList />
        </Provider>
    )
}