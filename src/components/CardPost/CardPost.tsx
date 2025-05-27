import React from "react";
import Post from "../../models/Post";

interface CardPostProps {
  post: Post;
}

function CardPost({ post }: CardPostProps) {
  return (
    <div className="flex items-center justify-center m-2">
      <div className="max-w-md rounded-3xl p-px bg-gradient-to-b from-lime-600 to-lime-300 w-[20rem]">
        <div className="rounded-[calc(1.5rem-1px)] p-10 bg-gray-600 dark:bg-gray-900 ">
          <h4 className="text-lg font-medium text-lime-400 text-center">
            {post.title}
          </h4>
          <p className="text-white scroll-m-2">{post.text}</p>

          <div className="mt-8 flex gap-4 items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={post.user.photo}
              alt="user photo"
            />
            <div>
              <h3 className="text-lg font-medium text-lime-400">
                {post.user?.name}
              </h3>

              <span className="text-sm tracking-wide text-lime-400">
                {post.theme?.description}
              </span>
              <p className="text-lime-400">
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: "full",
                }).format(new Date(post.date))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPost;
