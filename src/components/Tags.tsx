import type { Tag } from "types/blog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

type Props = { tags: Tag[] };

export default function Tags({ tags }: Props) {
  return (
    <div className="bg-white">
      <div className="flex items-center border-b px-6 py-4">
        <FontAwesomeIcon icon={faTag} />
        <h2 className="pl-2 font-raleway text-xl">Tags</h2>
      </div>
      {tags.map((tag) => (
        <ul key={tag.id} className="px-6 py-4">
          <button>
            <li>{tag.tag}</li>
          </button>
        </ul>
      ))}
    </div>
  );
}
