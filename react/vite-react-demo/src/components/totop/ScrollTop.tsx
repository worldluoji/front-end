import { useCallback, CSSProperties} from 'react';
import useScroll from '../../hooks/useScroll';

function ScrollTop() {
  const { y } = useScroll();

  const goTop = useCallback(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const style: CSSProperties = {
    position: "fixed",
    right: "10px",
    bottom: "10px",
  };
  // 当滚动条位置纵向超过 300 时，显示返回顶部按钮
  if (y > 300) {
    return (
      <button onClick={goTop} style={style}>
        Back to Top
      </button>
    );
  }
  // 否则不 render 任何 UI
  return null;
}

function Demo() {
  return (
    <div>
      <div>
        {[...new Array(100)].map((_, i) => (
          <p key={i}>test { i } </p>        
        ))}
      </div>
      <ScrollTop />
    </div>
  )
}

export default Demo