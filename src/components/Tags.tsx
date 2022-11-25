import Link from "next/link";

import { useRouter } from "next/router";

import type { Tag } from "types/blog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

type Props = { tags: Tag[] };

export default function Tags({ tags }: Props) {
  const router = useRouter();

  // 現在のパスならTrue
  const isCurrentPath = (url: string): boolean => {
    return router.asPath.startsWith(url);
  };

  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faTag} />
          <h2 className="pl-2 font-raleway text-xl">Tags</h2>
        </div>
        {router.pathname !== "/" ? (
          <div className="group relative">
            <span
              className={[
                "whitespace-nowrap",
                "bg-red-300",
                "px-2",
                "py-1",
                "text-white",
                "absolute",
                "-top-12",
                "left-1/2",
                "-translate-x-1/2",
                "before:content-['']",
                "before:absolute",
                "before:-translate-x-1/2",
                "before:left-1/2",
                "before:top-full",
                "before:border-4",
                "before:border-transparent",
                "before:border-t-red-300",
                "opacity-0",
                "group-hover:opacity-100",
                "transition",
                "pointer-events-none",
              ].join(" ")}
            >
              タグのリセット
            </span>
            <Link href="/">
              <FontAwesomeIcon icon={faRotate} className="cursor-pointer" />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
      {tags.map((tag) => (
        <ul key={tag.id} className="py-2 px-6">
          <div
            className={cn(
              "cursor-pointer rounded p-2",
              isCurrentPath(`/tagsBlog/${tag.id}`)
                ? "bg-blue-100"
                : "hover:bg-gray-200"
            )}
          >
            <Link href={`/tagsBlog/${tag.id}`}>
              <li>{tag.tag}</li>
            </Link>
          </div>
        </ul>
      ))}
    </div>
  );
}
