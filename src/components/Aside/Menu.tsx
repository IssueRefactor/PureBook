import type { InitProps, Menu } from "@models/application";
import type { ListIssues } from "@models/github";
import { parseMenuDataFromIssues } from "@utils/parser/issues";
import { listRepositoryIssuesFromOwnerAndRepo } from "@utils/request/github";
import { createSignal, JSX, onMount } from "solid-js";
import Section from "./Chapter/Chapter";
type MenuProps = InitProps<ListIssues>;

export default ({ initData: initIssues }: MenuProps): JSX.Element => {
  const [menuData, setMenuData] = createSignal<Menu[] | undefined>(
    initIssues ? parseMenuDataFromIssues(initIssues) : undefined
  );

  onMount(async () => {
    const issues = await listRepositoryIssuesFromOwnerAndRepo(
      "yuhang-dong",
      "github-page"
    );
    issues && setMenuData(parseMenuDataFromIssues(issues));
  });

  return (<>
    <div class="cursor-pointer">
      {
        menuData()?.map(menu => (<Section {...menu}/>))
      }
    </div></>
  );
};
