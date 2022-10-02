
import TableOfContents from './TableOfContents';
import MoreMenu from './MoreMenu';
import type { MarkdownHeading } from 'astro';
import { createEffect } from 'solid-js';

type Props = {
	headings?: MarkdownHeading[];
	githubEditUrl: string;
};

export default (props: Props) => {

	return (
<nav class="w-full sticky top-0" aria-labelledby="grid-right">
	<div class="h-full p-0 pt-2 overflow-auto">
		<TableOfContents headings={props.headings} />
		<MoreMenu editHref={props.githubEditUrl} />
	</div>
</nav>
	)
}




