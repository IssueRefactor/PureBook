import type { InitProps, Menu } from "@models/application";
import type { Issue } from "@models/github";
import { useState } from "react";
import { parseMenuDataFromIssues } from "@utils/parser/issues";
import { useAsyncEffect } from "ahooks";
import { listRepositoryIssuesFromOwnerAndRepo } from "@utils/request/github";
import Section from "./Chapter/Chapter";
type MenuProps = InitProps<Issue[]>;

export default ({ initData: initIssues }: MenuProps) => {
  const [menuData, setMenuData] = useState<Menu[]>(
    parseMenuDataFromIssues(initIssues)
  );

  useAsyncEffect(async () => {
    const issues = await listRepositoryIssuesFromOwnerAndRepo(
      "yuhang-dong",
      "github-page"
    );
    setMenuData(parseMenuDataFromIssues(issues));
  }, []);

  return (
    <div className="cursor-pointer">
      {
        menuData.map(menu => (<Section {...menu} key={menu.name}/>))
      }
    </div>
  );
};
