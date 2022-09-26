import type { ListComments } from "@models/github";
import { renderMd } from "@utils/parser/render/mdRender";
import { getRepositoryIssue, listRepositoryIssueComments } from "@utils/request/github";
import { useAsyncEffect } from "ahooks";
import EmptyIcon from '@assets/empty.svg'
import { useState } from "react"

type DynamicMDProps = {
    issueUrl: string,
    commentsUrl: string
    originNote?: string | null
}

export default ({issueUrl, commentsUrl, originNote}: DynamicMDProps) => {

    const [note, setNote] = useState<string | null | undefined>(originNote);
    const [comments, setComments] = useState<ListComments>();

    useAsyncEffect(async() => {
        const [note, comments] = await Promise.all([getRepositoryIssue(issueUrl), listRepositoryIssueComments(commentsUrl)]);
        setNote(note?.body || '')
        setComments(comments)
    }, [])

    if(!note) {
        return <img src={EmptyIcon} width="360" height="360"/>;
    }

    return (
        <div dangerouslySetInnerHTML={{__html: renderMd(note)}}>
        </div>
    )
}