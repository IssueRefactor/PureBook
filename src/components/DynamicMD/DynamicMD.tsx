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

    const [note, setNote] = createSignal<string | null | undefined>(originNote);
    const [comments, setComments] = createSignal<ListComments>();

    onMount(async() => {
        const [note, comments] = await Promise.all([getRepositoryIssue(issueUrl), listRepositoryIssueComments(commentsUrl)]);
        setNote(note?.body || '')
        setComments(comments)
    })

    if(!note()) {
        return <img src={EmptyIcon} width="360" height="360"/>;
    }

    return (
        <div textContent={renderMd(note()!)}>
        </div>
    )
}
