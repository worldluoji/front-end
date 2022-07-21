import React from "react";
import './turntable.scss';

const prizeItems = [
    {
      name: "专属优惠",
      img: "https://cdn-icons-png.flaticon.com/512/1405/1405225.png"
    },
    {
      name: "变形金刚",
      img: "https://cdn-icons-png.flaticon.com/512/7926/7926936.png"
    },
    {
      name: "铁锅三件套",
      img: "https://cdn-icons-png.flaticon.com/512/3063/3063504.png"
    },
    {
      name: "格子吐司机",
      img: "https://cdn-icons-png.flaticon.com/512/4353/4353006.png"
    },
    {
      name: "折扣券",
      img: "https://cdn-icons-png.flaticon.com/512/612/612885.png"
    },
    {
      name: "红包袋",
      img: "https://cdn-icons-png.flaticon.com/512/677/677721.png"
    },
    {
      name: "迪士尼随手瓶",
      img: "https://cdn-icons-png.flaticon.com/512/4982/4982355.png"
    },
    {
      name: "黑山牛排",
      img: "https://cdn-icons-png.flaticon.com/512/5854/5854248.png"
    },
];

interface TypePrize {
    prizeName: string,
    url: string
}

const Prize = ( {prizeName, url}:TypePrize) => (
    <li>
        <p>{ prizeName }</p>
        <img src={ url } />
    </li>
)

const PrizeList = () => {
    const list = prizeItems.map(item => <Prize prizeName={item.name} url={item.img} />);
    return <ul>{ list }</ul>
}

const Turntable = () => (
    <div className="container">
    <section className="turntable">
        <div className="list">
          <PrizeList />
        </div>
        <button className="turntable_btn" type="button">GO</button>
        <svg viewBox="-50 -50 100 100">
            <g className="bottom">
                <ellipse cx="0" cy="40" rx="30" ry="4"></ellipse>
            </g>
            <g className="polyline">
                <polyline points="-16,-38 16,-38 0,0"></polyline>
                <polyline points="16,-38 38,-16 0,0"></polyline>
                <polyline points="38,-16 38,16 0,0"></polyline>
                <polyline points="0,0 38,16 16,38"></polyline>
                <polyline points="0,0 16,38 -16,38"></polyline>
                <polyline points="0,0 -16,38 -38,16"></polyline>
                <polyline points="-38,-16 -38,16 0,0"></polyline>
                <polyline points="-16,-38 -38,-16 0,0"></polyline>
            </g>
            <circle cx="0" cy="0" r="40"></circle>
            <g className="circle">
                <circle cx="0" cy="-40" r="0.8"></circle>
                <circle cx="15.6" cy="-36.8" r="0.8"></circle>
                <circle cx="28.5" cy="-28" r="0.8"></circle>
                <circle cx="36.8" cy="-15.6" r="0.8"></circle>
                <circle cx="40" cy="0" r="0.8"></circle>
                <circle cx="36.8" cy="15.6" r="0.8"></circle>
                <circle cx="28.5" cy="28" r="0.8"></circle>
                <circle cx="15.6" cy="36.8" r="0.8"></circle>
                <circle cx="0" cy="40" r="0.8"></circle>
                <circle cx="-36.8" cy="15.6" r="0.8"></circle>
                <circle cx="-28.5" cy="28" r="0.8"></circle>
                <circle cx="-15.6" cy="36.8" r="0.8"></circle>
                <circle cx="-40" cy="0" r="0.8"></circle>
                <circle cx="-36.8" cy="-15.6" r="0.8"></circle>
                <circle cx="-28.5" cy="-28" r="0.8"></circle>
                <circle cx="-15.6" cy="-36.8" r="0.8"></circle>
            </g>
            <g className="mark">
                <circle cx="0" cy="-43" r="4"></circle>
                <polyline points="-3.5,-41 3.5,-41 0,-35"></polyline>
                <circle className="round" cx="0" cy="-43" r="1.5"></circle>
            </g>
        </svg>
    </section>
    </div>
)

export default Turntable;