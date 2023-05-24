import AboutMe from "components/AboutMe";
import Tags from "components/Tags";

import getWindowSize from "hooks/getWindowSize";

import type { Tag } from "types/blog";

type Props = {
  tags: Tag[];
};

// 画面サイズがxl以上ならtrueを返す
function isBreakPointXl() {
  const { width } = getWindowSize();
  const BREAK_POINT_PX_XL = 1280;
  return width >= BREAK_POINT_PX_XL;
}

export default function SideBar({ tags }: Props) {
  return (
    <div>
      {isBreakPointXl() ? (
        <div className="ml-10 lg:col-span-1">
          {/* 自己紹介 */}
          <AboutMe />
          {/* タグ一覧 */}
          <Tags tags={tags} />
        </div>
      ) : null}
    </div>
  );
}
