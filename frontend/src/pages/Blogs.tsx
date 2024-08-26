import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="min-h-screen py-16 sm:px-8">
      <div className="flex flex-col">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author.username}
            title={blog.title}
            content={blog.content}
            createdAt={blog.createdAt}
          ></BlogCard>
        ))}
      </div>
    </div>
  );
};
