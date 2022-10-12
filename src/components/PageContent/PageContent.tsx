import MoreMenu from '../RightSidebar/MoreMenu';
import TableOfContents from '../RightSidebar/TableOfContents';
import type { MarkdownHeading } from '@models/application';
import type { JSXElement } from 'solid-js';

type Props = {
	title?: string;
	headings?: MarkdownHeading[];
	githubEditUrl: string;
	children: JSXElement
};

export default ({ title, headings, githubEditUrl, children } : Props) => {


	return (<article id="article" class="p-0 w-full h-full flex flex-col max-w-prose">
	<section class="main-section mb-16">
		<h1 class="content-title" id="overview">{title}</h1>
		<nav class="block sm:hidden">
			<TableOfContents headings={headings || []} />
		</nav>
		{children}
	</section>
	<nav class="block sm:hidden">
		<MoreMenu editHref={githubEditUrl} />
	</nav>
</article>)
}