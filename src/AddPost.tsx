import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { addPost, fetchTags } from "./api/api";

type Props = {};

const AddPost = (props: Props) => {
    const {data:tagsData} = useQuery({
        queryKey : ["tags"],
        queryFn : fetchTags,
        staleTime: Infinity,
    })
    const queryClient= useQueryClient();
  const { mutate, isError, error, isPending, reset } = useMutation({
    mutationFn: addPost,
    onMutate: ()=> {return {id:1}},
    onSuccess:(data,variables,context)=>{
      queryClient.invalidateQueries({
        queryKey:["posts"]
      })
    }
  });
const submitHandler = (e:any)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const tags = Array.from(formData.keys()).filter(key => formData.get(key)==='on');
    // console.log(title,tags);
    if(!title || !tags) return;
    mutate({id:33,title,tags});
    e.target.reset();
}
  return (
    <div className="container">
      <h1>Add Post</h1>
      <form action="" onSubmit={submitHandler}>
        <input type="text" placeholder="Enter your post" className="postbox" name="title"></input>
        <div className="tags">
            {tagsData?.map((tag:any,index:number)=> (
                <div key={index}>
                    <input type="checkbox" name={tag} id={tag} />
                    <label htmlFor={tag}>{tag}</label>
                </div>
            ))}
        </div>
        <button type="submit">Add Post</button>
      </form>
      {isPending && <p>Still pending!!!</p>}
      {isError && <p onClick={()=> reset()}>Something went wrong!!{error.message}</p>}
    </div>
  );
};

export default AddPost;
