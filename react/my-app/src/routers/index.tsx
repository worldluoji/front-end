import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../components/App';

import Counter from '../components/counter/counter';

const Root = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/counter" element={<Counter />} />
            {/* v6 router之前的老版本： <Route path=".*" component={ App }/>, 且不需要Routes包裹 */}
         </Routes>
    </BrowserRouter>
)

export default Root;