import type { GetIssue, ListComments, ListIssues } from "../../../models/github";
import request from "..";

const baseGetRequest = <T>() => ((url: string) => request.get<T>(url))

export const listRepositoryIssuesFromRepoUrl = baseGetRequest<ListIssues>()

export const getRepositoryIssue = baseGetRequest<GetIssue>()

export const listRepositoryIssueComments = baseGetRequest<ListComments>()


// -----------------------------------------------------------------------------------//
export const listRepositoryIssuesFromOwnerAndRepo = (owner: string, repo: string) => {
    return listRepositoryIssuesFromRepoUrl(`https://api.github.com/repos/${owner}/${repo}/issues`)
}

export const getRepositoryIssueFromIssueId = (issueId: number | string) => {
    return getRepositoryIssue(`https://api.github.com/repos/yuhang-dong/github-page/issues/${issueId}`)
}