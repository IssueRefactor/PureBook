import type { ListComments } from "@models/github";
import { getRepositoryIssue, listRepositoryIssueComments } from "@utils/request/github";
import { useAsyncEffect } from "ahooks";
import { useState } from "react"

type DynamicMDProps = {
    issueUrl: string,
    commentsUrl: string
    originNote?: string | null
}

export default ({issueUrl, commentsUrl, originNote}: DynamicMDProps) => {

    const [note, setNote] = useState<string>();
    const [comments, setComments] = useState<ListComments>();

    useAsyncEffect(async() => {
        const [note, comments] = await Promise.all([getRepositoryIssue(issueUrl), listRepositoryIssueComments(commentsUrl)]);
        setNote(note.body || '')
        setComments(comments)
    }, [])
    return (
        <div>
            {note || originNote}
        </div>
    )
}