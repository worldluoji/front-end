import React, { useEffect, useState, useLayoutEffect, Suspense } from 'react';
import { fetchProfileData } from './fakeApi.ts';
import type { FakeUser, FakePost } from './fakeApi.ts';

// 使用Typescript时，需要明确指定入参字段名和类型。比如这里指定了name属性，下面JSX中Sibling组件才可以使用name属性，否则ts会报错
interface SiblingProps {
    name: string;
}

function Sibling(props: SiblingProps) {
    useLayoutEffect(() => {
      console.log("Layout effect Sibling", props.name);
      return () => {
        console.log("Layout cleanup Sibling", props.name);
      };
    });
  
    useEffect(() => {
      console.log("Effect Sibling", props.name);
  
      return () => {
        console.log("Cleanup Sibling", props.name);
      };
    }, [props.name]);
  
    console.log("Render sibling", props.name);
    return <h1>Sibling</h1>;
}

const initialResource = fetchProfileData();
type Resource = typeof initialResource;

interface ProfileProps {
    resource: Resource
}

function ProfileDetails(props: ProfileProps) {
    useLayoutEffect(() => {
      console.log("Layout effect ProfileDetails");
      return () => {
        console.log("Layout cleanup ProfileDetails");
      };
    });
  
    useEffect(() => {
      console.log("Effect ProfileDetails");
      return () => {
        console.log("Cleanup ProfileDetails");
      };
    });
    const user = props.resource.user.read() as FakeUser;
    return <h1>{user.name}</h1>;
}

const ProfileTimeline: React.FC<ProfileProps> = (props) => {
    const posts = props.resource.posts.read() as FakePost[];
    useLayoutEffect(() => {
      console.log("Layout effect ProfileTimeline");
      return () => {
        console.log("Layout cleanup ProfileTimeline");
      };
    });
  
    useEffect(() => {
      console.log("Effect ProfileTimeline");
      return () => {
        console.log("Cleanup ProfileTimeline");
      };
    });
  
    return (
      <ul>
        {posts.map((post: {id: number, text: string}) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    );
}

export default function ProfilePage() {
    const [resource] = useState(initialResource);
    return (
      <>
        <Suspense
          fallback={
            <>
              <h1>Loading profile...</h1>
            </> 
          }
        >
          <Sibling name="one" />
          {/* ProfileDetails会请求数据，在数据返回之前，会显示fallback中的内容 */}
          <ProfileDetails resource={resource} />
          <Suspense fallback={<h1>Loading posts...</h1>}>
            <Sibling name="two" />
            <ProfileTimeline resource={resource}/>
            <Sibling name="three" />
          </Suspense>
          <Sibling name="four" />
        </Suspense>
      </>
    );
}
