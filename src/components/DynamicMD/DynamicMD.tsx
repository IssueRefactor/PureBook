import type { ListComments } from "@models/github";
import { renderMd } from "@utils/parser/render/mdRender";
import { getRepositoryIssue, listRepositoryIssueComments } from "@utils/request/github";
import EmptyIcon from '@assets/empty.svg'
import { createSignal, onMount } from "solid-js";

type DynamicMDProps = {
    issueUrl: string,
    commentsUrl: string
    originNote?: string | null
}

export default ({issueUrl, commentsUrl, originNote}: DynamicMDProps) => {

    const [html, setHtml] = createSignal<string | undefined | null>(originNote);
    // const [comments, setComments] = createSignal<ListComments>();

    onMount(async() => {
        const [note, comments] = await Promise.all([getRepositoryIssue(issueUrl), listRepositoryIssueComments(commentsUrl)]);
        const html = await renderMd(note?.body || '');
        setHtml(html.metadata.html)
        // setComments(comments)
    })

    if(!html()) {
        return <img src={EmptyIcon} width="360" height="360"/>;
    }

    return (
        // @ts-ignore innerHTML is solid.js attribute. refer: https://www.solidjs.com/docs/latest/api#innerhtmltextcontent
        <div innerHTML={html()}></div>
    )
}
