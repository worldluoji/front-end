import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../components/App';

import Resize from '../components/resize/resize';
import Blog from '../components/blogdata/blogdata';
import Timer from '../components/counter/timer';
import ThemeContext from '../components/context/themecontext';
import Carousel from '../components/carousel/carousel.tsx';
import Turntable from '../components/turntable/turntable';
import SearchBox from '../components/searchbox/SearchBox';
import Board from '../components/board/board';
import CardList from '../components/redux/ReduxDemo';
import ScrollTop from '../components/totop/ScrollTop';
import KeyPress from '../components/keypress/KeyPress';
import UserList from '../components/userlist/UserList';
import CreateReducerDemo from '../components/redux/CreateReducerDemo.tsx';


const Root = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/resize" element={<Resize />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/context" element={<ThemeContext />} />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/turntable" element={<Turntable />} />
            <Route path="/searchbox" element={<SearchBox />} />
            <Route path="/board" element={<Board />} />
            <Route path="/cardlist" element={<CardList />} />
            <Route path="/totop" element={<ScrollTop />} />
            <Route path="/keypress" element={<KeyPress />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/createReducer" element={<CreateReducerDemo />} />
            {/* v6 router之前的老版本： <Route path=".*" component={ App }/>, 且不需要Routes包裹 */}
         </Routes>
    </BrowserRouter>
)

export default Root;