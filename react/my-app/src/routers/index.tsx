import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../components/App';

import Counter from '../components/counter/counter';
import Resize from '../components/resize/resize';
import Blog from '../components/blogdata/blogdata';
import Timer from '../components/counter/timer';
import ThemeContext from '../components/context/themecontext';
import Carousel from '../components/carousel/carousel';
import Turntable from '../components/turntable/turntable';

const Root = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/resize" element={<Resize />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/context" element={<ThemeContext />} />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/turntable" element={<Turntable />} />
            {/* v6 router之前的老版本： <Route path=".*" component={ App }/>, 且不需要Routes包裹 */}
         </Routes>
    </BrowserRouter>
)

export default Root;