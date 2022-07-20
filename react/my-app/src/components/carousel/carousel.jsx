import React, { useState } from 'react';

import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import './carousel.scss'

const CARDS = 8;
const MAX_VISIBILITY = 3;

const Card = ({ title, content }) => (
    <div className='card'>
        <h2>{ title }</h2>
        <p>{ content }</p>
    </div>
)

const Carousel = ({ children }) => {
    const [active, setActive] = useState(2);
    const count = React.Children.count(children);
    
    return (
        <div className='carousel'>
            { active > 0 && <button className='nav left' onClick={() => setActive(i => i-1)}>
                <TiChevronLeftOutline/></button>}
            
            { React.Children.map(children, (child, i) => (
                // --active, --offset这些变量会传入到css中生效
                // Math.sign 小于0为 -1，大于0为1，否则为0
                // pointer-events: auto|none; 默认值auto。元素对指针事件做出反应，比如 :hover 和 click。
                <div className='card-container' style={{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 3,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / 3,
                    'pointerEvents': active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                    'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                }}>
                    { child }
                </div>
            ))}

            {active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}>
            <TiChevronRightOutline/>
                </button>}
        </div>
    );
};

const App = () => (
    // 进行组件遍历的时候需要加一个key来区分每个组件, 这样能提升 dom diff 对比的性能，否则会有warning
    <div className='app'>
        <Carousel>
            {[...new Array(CARDS)].map((_, i) => (
                <Card key={ i + 1} title={'Card' + (i + 1)} content='testLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
            ))}
        </Carousel>
    </div>
)

export default App;