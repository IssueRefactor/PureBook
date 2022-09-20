import type { Issue } from "../../../models/github";
import request from "..";


export const listRepositoryIssuesFromOwnerAndRepo = (owner: string, repo: string) => {
    return listRepositoryIssuesFromRepoUrl(`https://api.github.com/repos/${owner}/${repo}/issues`)
}

export const listRepositoryIssuesFromRepoUrl = (repoUrl: string) => {
    return request.get<Issue[]>(repoUrl, {
        headers: {
            'Accept': 'application/vnd.github+json'
        }
    });
}