import Root from './routers'

// 引入ant design样式，否则不显示
import 'antd/dist/reset.css'

import { createRoot } from 'react-dom/client';
const container = document.querySelectorAll('.app')[0]
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Root />);