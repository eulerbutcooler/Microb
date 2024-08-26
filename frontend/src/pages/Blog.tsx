import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

export const Blog = ()=>{
    const { id } = useParams()
    const {loading, blog} = useBlog({id: id || ""})
    if(loading){
        return <div>
            loading...
        </div>
    }
    return <div className="min-h-screen bg-white">
      { blog && <FullBlog blog={blog}></FullBlog>}
    </div>
}