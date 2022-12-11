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

// 今日の日付 - 記事投稿日
function getDateDifference(date: Date) {
  const getToday = new Date().getTime();
  const createAt = new Date(date).getTime();
  return getToday - createAt;
}

// 記事投稿から３日以内ならtrue
function isWithinThreeDays(date: Date) {
  const CONVERT_3_DAYS_TO_MILLISECONDS = 259200000;
  return getDateDifference(date) <= CONVERT_3_DAYS_TO_MILLISECONDS;
}

export default function Post({ blogs, tags }: Props) {
  return (
    <div className="grid flex-grow p-6 lg:p-8 xl:grid-cols-6 xl:p-10">
      {/* 記事一覧 */}
      <div className="min-h-screen bg-white lg:col-span-5">
        <div className="m-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="relative">
              {/* new state */}
              <div className="absolute top-4 -left-4 z-10 w-28 bg-white">
                <div className="text-center font-raleway">
                  {isWithinThreeDays(blog.createdAt) ? <p>New</p> : <></>}
                </div>
              </div>
              <BlurImage blog={blog} />

              <div className="mt-2 flex items-center">
                <FontAwesomeIcon icon={faTag} />
                {blog.tags.map((tag) => (
                  <div className="flex pl-2" key={tag.id}>
                    <p className="font-raleway text-sm">#{tag.tag}</p>
                  </div>
                ))}
              </div>
              <div className="mb-8 mt-4 flex items-center justify-between">
                <h3 className="truncate font-notoserif text-xl text-gray-900">
                  {blog.title}
                </h3>
                <div className="mt-1 flex items-center gap-1 font-notoserif text-sm font-medium text-gray-900">
                  <FontAwesomeIcon icon={faClock} />
                  <p>{getFormattedDate(blog.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ml-10 hidden lg:col-span-1 lg:inline-block">
        {/* About Me */}
        <div className="mb-10 bg-white p-6">
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
