import Image from "next/image";

import BlurImage from "components/BlurImage";
import Tags from "components/Tags";

import type { Blog, Tag } from "types/blog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";

// 日付のフォーマット変更
const getFormattedDate = (date: Date): string =>
  new Date(date).toLocaleDateString();

type Props = { blogs: Blog[]; tags: Tag[] };

export default function Post({ blogs, tags }: Props) {
  return (
    <div className="grid flex-grow grid-cols-6 p-14">
      {/* 記事一覧 */}
      <div className="col-span-5 bg-white">
        <div className="m-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <BlurImage blog={blog} />

              <div className="mt-2 flex items-center">
                <FontAwesomeIcon icon={faTag} />
                {blog.tags.map((tag) => (
                  <div className="flex pl-2" key={tag.id}>
                    <p className="font-raleway text-sm">#{tag.tag}</p>
                  </div>
                ))}
              </div>
              <h3 className="mt-4 font-notoserif text-2xl text-gray-900">
                {blog.title}
              </h3>
              <div className="mt-1 flex items-center font-notoserif text-sm font-medium text-gray-900">
                <FontAwesomeIcon icon={faClock} />
                <p className="pl-2">{getFormattedDate(blog.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-1 ml-14">
        {/* About Me */}
        <div className="mb-14 bg-white p-6">
          <div className="grid grid-cols-2 gap-x-6">
            <div className="aspect-w-1 aspect-h-1 col-span-1">
              <Image
                src="/imgs/ryota.jpg"
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
            <div className="col-span-1">
              <h1 className="font-raleway">Matsui Ryota</h1>
            </div>
          </div>
        </div>

        {/* タグ一覧 */}
        <Tags tags={tags} />
      </div>
    </div>
  );
}
