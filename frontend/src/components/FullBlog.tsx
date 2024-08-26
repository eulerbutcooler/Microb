import { Blog } from "../hooks";
import { Share } from "./Share";
import x from "../assets/x.svg";
import copylink from "../assets/link.svg";
import tick from "../assets/tick.svg";
import { useState } from "react";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleclick = async () => {
    await sharebuttons.copyLink();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  const sharebuttons = new Share(
    window.location.href,
    blog.title,
    `Check out this cool blog: ${blog.title}`
  );

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="p-5 pt-10 m-2 text-3xl font-bold sm:text-5xl text-center font-serif w-full sm:max-w-screen-md">
          {blog.title}
        </h1>
        <div className="flex text-a_grey font-thin text-xs sm:text-sm text-nowrap p-3">
          <div className="p-3">{blog.author.username.toUpperCase()}</div>
          <div className="text-xs pt-3">&#9679;</div>
          <div className="p-3">{blog.createdAt.slice(0, 10)}</div>
          <div className="pt-3 text-xs">&#9679;</div>
          <div className="flex">
            <button
              onClick={() => sharebuttons.shareTwitter()}
              className="w-6 h-6 m-2 p-1 sm:w-7 sm:h-7 sm:m-1 sm:pt-[5.5px] rounded-lg"
            >
              <img src={x} alt="Share on X" />
            </button>
            <div className="pt-3 text-xs">&#9679;</div>
            <button
              onClick={handleclick}
              className="w-6 h-6 m-2 p-[1.5px] sm:w-7 sm:h-7 sm:m-1 sm:pt-[4px] rounded-lg"
            >
              <img src={isCopied ? tick : copylink} alt="Copy link" />
            </button>
          </div>
        </div>
        <div className="p-5 m-2 text-pretty w-full sm:max-w-screen-md sm:text-lg">
          {blog.content}
        </div>
      </div>
    </div>
  );
};
