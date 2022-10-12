import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
export type ListIssues = RestEndpointMethodTypes['issues']['list']['response']['data']
export type GetIssue =RestEndpointMethodTypes['issues']['get']['response']['data']

export type Comments = RestEndpointMethodTypes['issues']['listComments']['response']['data']
// export type Comment = RestEndpointMethodTypes['issues']['getComment']['response']['data']
export type Comment = Comments[0]