import { Link } from "react-router-dom";
import rightarrow from "../assets/rightarrow.svg";
interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  createdAt,
}: BlogCardProps) => {
  function wordcounter(input: string): string {
    const words = input.split(/\s+/);
    return words.length <= 15 ? input : words.slice(0, 15).join(" ") + "...";
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center text-a_grey font-thin text-xs sm:text-sm text-nowrap">
          <div className="p-1">{authorName.toUpperCase()}</div>
          <div className="text-xs pt-1">&#9679;</div>
          <div className="p-1">{createdAt.slice(0, 10)}</div>
          <div className="pt-1 text-xs">&#9679;</div>
          <div className="p-1">
            {`${Math.ceil(content.length / 400)}` + " min read"}
          </div>
        </div>
        <div className="p-1 pt-2 m-1 text-xl font-bold sm:text-3xl text-center font-serif w-full sm:max-w-screen-md">
          {title}
        </div>
        <div className="p-1 m-1 text-pretty text-center w-full sm:text-lg sm:max-w-screen-md">
          {wordcounter(content)}
        </div>
        <Link
          to={`/blog/id/${id}`}
          className="flex items-center justify-center text-center group transition-all duration-300 ease-in-out"
        >
          <span className="text-a_blue font-medium text-sm pt-3 group-hover:text-a_voilet transition-colors duration-300">
            READ MORE
          </span>
          <img
            width={45}
            className="mt-3 pl-3 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
            src={rightarrow}
            alt="Right arrow"
          />
        </Link>
        <div className="mt-2 border-b-2 h-1 bg-slate-200 w-96 sm:max-w-screen-lgmd rounded-lg"/>
      </div>
    </div>
  );
};