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
    <div className="bg-cream-four">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faTag} className="text-gray-three" />
          <h2 className="pl-2 font-raleway text-xl text-gray-three">Tags</h2>
        </div>
        {router.pathname !== "/" ? (
          <div className="group relative">
            <Link href="/">
              <FontAwesomeIcon icon={faRotate} className="cursor-pointer" />
            </Link>
          </div>
        ) : null}
      </div>
      {tags.map((tag) => (
        <ul key={tag.id} className="py-2 px-6">
          <div
            className={cn(
              "cursor-pointer rounded p-2",
              isCurrentPath(`/tagsBlog/${tag.id}`)
                ? "bg-olive-one"
                : "hover:bg-leaf-one"
            )}
          >
            <Link href={`/tagsBlog/${tag.id}`}>
              <li className="text-gray-three">{tag.tag}</li>
            </Link>
          </div>
        </ul>
      ))}
    </div>
  );
}
