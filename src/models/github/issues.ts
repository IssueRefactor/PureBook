import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import type {  RestEndType } from ".";

export type ListIssues = RestEndpointMethodTypes['issues']['list']['response']['data']
export type GetIssue =RestEndpointMethodTypes['issues']['get']['response']['data']
export type ListComments = RestEndpointMethodTypes['issues']['listComments']['response']['data']