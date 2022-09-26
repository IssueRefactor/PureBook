import type { InitProps, Menu } from "@models/application";
import type { ListIssues } from "@models/github";
import { useState } from "react";
import { parseMenuDataFromIssues } from "@utils/parser/issues";
import { useAsyncEffect } from "ahooks";
import { listRepositoryIssuesFromOwnerAndRepo } from "@utils/request/github";
import Section from "./Chapter/Chapter";
type MenuProps = InitProps<ListIssues>;

export default ({ initData: initIssues }: MenuProps) => {
  const [menuData, setMenuData] = useState<Menu[] | undefined>(
    initIssues ? parseMenuDataFromIssues(initIssues) : undefined
  );

  useAsyncEffect(async () => {
    const issues = await listRepositoryIssuesFromOwnerAndRepo(
      "yuhang-dong",
      "github-page"
    );
    issues && setMenuData(parseMenuDataFromIssues(issues));
  }, []);

  return (
    <div className="cursor-pointer">
      {
        menuData?.map(menu => (<Section {...menu} key={menu.name}/>))
      }
    </div>
  );
};
