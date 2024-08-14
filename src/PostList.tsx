import { useQuery } from '@tanstack/react-query'
// import React from 'react'
import { fetchPosts } from './api/api'
import { useState } from 'react'

// type Props = {}

const PostList = () => {
    const [page,setPage] = useState(1);
    const {data:postData,isLoading,isError,error} = useQuery({
        queryKey: ['posts',{page}],
        queryFn: ()=>fetchPosts(page),
        staleTime: 1000*60,
    })
  return (
    <div>
        <h1>Post Lists</h1>
        {isLoading && <p>Still Loading!!!</p>}
        {isError && <p>Error: {error.message}</p>}
        {postData?.data?.map((post:any) => (
            <div>
                <h2>{post.title}</h2>
                <ul>
                    {post.tags.map((tag:any) => <li>{tag}</li>)}
                </ul>
            </div>
        ))}
        <div className='pages'>
            <button onClick={()=> setPage(oldPage => oldPage-1)} disabled={!postData?.prev}>previous page</button>
            <span>{page}</span>
            <button onClick={()=> setPage(oldPage => oldPage+1)} disabled={!postData?.next}>next page</button>
        </div>
    </div>
  )
}

export default PostList;