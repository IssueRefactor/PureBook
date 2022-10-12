import type { Comments } from '@models/github'
import Avatar from './components/Avatar'
import CommentSay from './components/Comment'
export type GitCommentsProps = {
    comments?: Comments
}

const GitComments =  (props: GitCommentsProps) => {


    return <div class='w-full'>
        {
            props.comments?.map(comment => (<div class='flex mb-2'>
                <Avatar avatar={comment.user?.avatar_url} />
                <CommentSay comment={comment} />
            </div>))
        }
    </div>
}

export default GitComments;