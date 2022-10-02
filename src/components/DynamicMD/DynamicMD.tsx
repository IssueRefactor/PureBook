import { renderMd } from "@utils/parser/render/mdRender";
import { getRepositoryIssue, listRepositoryIssueComments } from "@utils/request/github";
import EmptyIcon from '@assets/empty.svg'
import { createSignal, onMount } from "solid-js";
import PageContent from "@components/PageContent/PageContent";
import RightSidebar from "@components/RightSidebar/RightSidebar";
import type { MarkdownHeading } from "astro";
type DynamicMDProps = {
    issueUrl: string,
    commentsUrl: string
    originNote?: string | null,
    title: string,
}

export default ({issueUrl, commentsUrl, originNote, title}: DynamicMDProps) => {

    const [html, setHtml] = createSignal<string | undefined | null>(originNote);
    // const [comments, setComments] = createSignal<ListComments>();

    const [headings, setHeadings] = createSignal<MarkdownHeading[]>();
    onMount(async() => {
        const [note, comments] = await Promise.all([getRepositoryIssue(issueUrl), listRepositoryIssueComments(commentsUrl)]);
        const html = await renderMd(note?.body || '');
        setHtml(html.metadata.html)
        setHeadings(html.metadata.headings)
        // setComments(comments)
    })

    if(!html()) {
        return <img src={EmptyIcon} width="360" height="360"/>;
    }
    return (
    <>
        <div id="grid-main" class="grow flex items-center">
        <PageContent
          title={title}
          headings={headings()}
          githubEditUrl={''}
        >
        {/* @ts-ignore innerHTML is solid.js attribute. refer: https://www.solidjs.com/docs/latest/api#innerhtmltextcontent */}
        <div innerHTML={html()}></div>
        </PageContent>
      </div>
      <aside id="grid-right" class="grid-sidebar w-72 sticky top-0" title="Table of Contents">
        <RightSidebar headings={headings()} githubEditUrl={''}/>
      </aside>
    </>
        
    )
}
