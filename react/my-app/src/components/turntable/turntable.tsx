import React from "react";
import './turntable.scss';

const Turntable = () => (
    <div className="container">
    <section className="turntable">
        <div className="list">
            <ul></ul>
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