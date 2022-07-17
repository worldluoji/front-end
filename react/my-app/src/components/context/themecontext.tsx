import React from 'react';

interface Theme {
  [key: string]: any,
}

const themes: Theme = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

// 创建一个 Theme 的 Context
const ThemeContext = React.createContext(themes.light);
function App() {
   const [theme, setTheme] = React.useState("light");
   // 切换 theme 的回调函数  
   const toggleTheme = React.useCallback(() => {    
     setTheme((theme) => (theme === "light" ? "dark" : "light"));  
   }, []);

  // 整个应用使用 ThemeContext.Provider 作为根组件
  return (
    // themes.dark 是作为一个属性值传给 Provider 这个组件的，如果要让它变得动态，其实只要用一个 state 来保存，通过修改 state，就能实现动态的切换 Context 的值了。而且这么做，所有用到这个 Context 的地方都会自动刷
    <ThemeContext.Provider value={themes[theme]}>
      <Toolbar />
      <button onClick={toggleTheme}>click me</button>
    </ThemeContext.Provider>
  );
}
  
// 在 Toolbar 组件中使用一个会使用 Theme 的 Button
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 在 Theme Button 中使用 useContext 来获取当前的主题
function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return (
    <button style={{
      background: theme.background,
      color: theme.foreground
    }}>
      I am styled by theme context!
    </button>
  );
}

export default App;