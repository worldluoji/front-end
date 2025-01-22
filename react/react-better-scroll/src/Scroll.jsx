import { forwardRef, useState,useEffect, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((
    {
        direction = "vertical",
        click = true,
        refresh = true,
        onScroll = null,
        pullUp = null,
        pullDown = null,
        bounceTop = true,
        bounceBottom = true,
        children,
    }, 
    ref
) => {
  const [bScroll, setBScroll] = useState();

  const scrollContaninerRef = useRef();

  /*
  * useEffect 钩子用于处理副作用（side effects），如数据获取、订阅或手动修改 DOM。
  * 对于 BetterScroll 这样的第三方库，初始化和销毁实例、监听事件等操作都属于副作用，因此需要放在 useEffect 中进行管理。
  */
  useEffect (() => {
    /*
    对于 v2.1.0 版本，对 probeType 做了一次统一
    1. probeType 为 0，在任何时候都不派发 scroll 事件，
    2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
    3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
    4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
    */
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      },
      mouseWheel: true
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
    //eslint-disable-next-line
  }, []); // 依赖项为空数组，确保只在组件挂载时执行

  useEffect (() => {
    if (!bScroll || !onScroll) return;
    bScroll.on ('scroll', (scroll) => {
      onScroll (scroll);
    })
    return () => {
      bScroll.off ('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect (() => {
    if (!bScroll || !pullUp) return;
    bScroll.on ('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100){
        pullUp();
      }
    });
    return () => {
      bScroll.off ('scrollEnd');
    }
  }, [pullUp, bScroll]);

  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on ('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off ('touchEnd');
    }
  }, [pullDown, bScroll]);


  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh();
    }
  });

  useImperativeHandle (ref, () => ({
    refresh () {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContaninerRef}>
      { children }
    </ScrollContainer>
  );
})

Scroll.displayName = 'Scroll';


/*
propTypes 的作用是对传入组件的属性进行类型检查。
它可以帮助开发者在开发阶段捕获潜在的错误，并确保组件接收到的属性符合预期的类型和格式。
这对于维护代码质量和提高调试效率非常重要。
*/
Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool,// 是否支持向上吸顶
  children: PropTypes.node,
  click: PropTypes.bool
};

export default Scroll;
