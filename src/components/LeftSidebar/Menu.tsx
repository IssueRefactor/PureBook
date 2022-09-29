import type { InitProps, Menu } from "@models/application";
import type { ListIssues } from "@models/github";
import { parseMenuDataFromIssues } from "@utils/parser/issues";
import { listRepositoryIssuesFromOwnerAndRepo } from "@utils/request/github";
import { createSignal, JSX, onMount } from "solid-js";
import Chapter from "./Chapter/Chapter";

import './menu.css'
type MenuProps = InitProps<ListIssues>;

export default ({ initData: initIssues }: MenuProps) => {
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

  return (
    <nav aria-labelledby="grid-left">
	<ul class="nav-groups">
		{menuData()?.map((menu) => (
			<li>
				<Chapter {...menu}/>
			</li>
		))}
	</ul>
</nav>
  );
};
