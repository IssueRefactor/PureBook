import type {
  Comments,
  GetIssue,
  ListIssues,
  RateLimit,
} from "@models/github";
import request from "..";
import { isRateLimit } from "@utils/application/isRateLimit";

const baseGetRequest =
  <T>() =>
  (url: string) => {
    const data = request.get<T | RateLimit>(url);
    return data.then(value => {
        if(isRateLimit(value)) {
            // forever pending promise
            return new Promise<undefined>(() => {});
        }

        return value;
    })

    
  };

export const listRepositoryIssuesFromRepoUrl = baseGetRequest<ListIssues>();

export const getRepositoryIssue = baseGetRequest<GetIssue>();

export const listRepositoryIssueComments = baseGetRequest<Comments>();

// -----------------------------------------------------------------------------------//
export const listRepositoryIssuesFromOwnerAndRepo = (
  owner: string,
  repo: string
) => {
  return listRepositoryIssuesFromRepoUrl(
    `https://api.github.com/repos/${owner}/${repo}/issues`
  );
};

export const getRepositoryIssueFromIssueId = (issueId: number | string) => {
  return getRepositoryIssue(
    `https://api.github.com/repos/yuhang-dong/github-page/issues/${issueId}`
  );
};
