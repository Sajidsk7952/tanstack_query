// import { useState } from 'react'

import AddPost from "./AddPost"
import PostList from "./PostList"
import './App.css';
// import { useQuery } from "@tanstack/react-query"
// import {fetchPosts} from './api/api';

function App() {
  // const [count, setCount] = useState(0)
  // const {data,isLoading} = useQuery(
  //   {
  //     queryKey:["posts"],
  //     queryFn: fetchPosts
  //   }
  // )
  // console.log(data,isLoading);
  return (
    <>
      hi 
      <AddPost />
      <PostList />
    </>
  )
}

export default App
