import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    id: string;
    title: string;
    content: string;
    published: false;
    authorId: Number;
    createdAt: string;
    updatedAt: string;
    author: {
      username: string;
    };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}blog/all`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setBlogs(res.data.allblogs);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};


export const useBlog = ({ id } : {id:string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}blog/id/${id}`, {headers: {Authorization: localStorage.getItem("token")}})
        .then(res => {
            setBlog(res.data);
            setLoading(false)
        })
    }, [id])
    return {
        loading,
        blog
    }
}