import type { Comment } from "@models/github";
import { renderMarkdown } from "@utils/parser/render";


export type CommentProps = {
    comment: Comment
}
const CommentSay = ({comment}: CommentProps) => {

    return <div class="grow border-2 border-slate-100 p-2 ml-4 rounded-lg">
        <div class="pb-4">
            <div>
                <a href={comment.user?.html_url || ''} target='__blank'>{comment.user?.login || 'anoymous'}</a>发表于{comment.updated_at}
            </div>
        </div>
        <div class="markdown-body" innerHTML={renderMarkdown(comment.body || '')} />
    </div>;
}

export default CommentSay;