import Scroll from './Scroll';
import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`

const Item = styled.li`
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
`

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`

const onScroll = () => {
  console.log('scroll');
}

function App() {
  return (
    <Content>
      <Scroll onScroll={onScroll} direction={'vertical'}>
        <List>
          <Item>111111</Item>
          <Item>222222</Item> 
          <Item>333333</Item> 
          <Item>444444</Item> 
          <Item>555555</Item> 
          <Item>666666</Item> 
          <Item>777777</Item> 
          <Item>888888</Item> 
          <Item>999999</Item> 
          <Item>101010</Item>
          <Item>111111</Item>
          <Item>121212</Item>
          <Item>131313</Item>
        </List>
      </Scroll>
    </Content> 
  )
}

export default App;
