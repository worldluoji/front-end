
import { Popover } from "antd"

interface User {
  id: number;
  name: string
}

interface ListWithMoreProps {
  max: number;
  data: Array<User>;
  renderItem: React.FC<User>
}

/*
renderItem：用于接收一个函数，由父组件决定如何渲染一个列表项；
data：需要渲染的数据；
max：最多显示几条数据。
*/
function ListWithMore(props: ListWithMoreProps) {
  const elements = props.data.map((item) => props.renderItem(item))
  const show = elements.slice(0, props.max);
  const hide = elements.slice(props.max);
  return (
    <span className="exp-10-list-with-more">
      {show}
      {hide.length > 0 && (
        <Popover content={<div style={{ maxWidth: 500 }}>{hide}</div>}>
          <span className="more-items-wrapper">
            and{" "}
            <span className="more-items-trigger"> {hide.length} more...</span>
          </span>
        </Popover>
      )}
    </span>
  )
}

function ListWithMoreExample() {
    return (
        <div>
            <h1>User Names</h1>
            <div className="user-names">        
                Liked by:{" "}        
                <ListWithMore  renderItem={(user: User) => {  
                      return <span className="user-name" key={user.id}>{user.name}</span> 
                  }}          
                  data={[{id: 1, name: 'luoji1'},{id: 2, name: 'luoji3'},{id: 3, name: 'luoji4'},{id: 4, name: 'luoji5'},{id: 5, name: 'luoji6'}]}          
                  max={3} 
                />      
            </div>
        </div>
    )
}

export default ListWithMoreExample