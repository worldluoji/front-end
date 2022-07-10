import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../components/App';

const Root = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App/>} />
            {/* v6 router之前的老版本： <Route path=".*" component={ App }/>, 且不需要Routes包裹 */}
         </Routes>
    </BrowserRouter>
)

export default Root;