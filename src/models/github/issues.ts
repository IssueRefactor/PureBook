import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type ListIssues = RestEndpointMethodTypes['issues']['list']['response']['data']
export type Milestone = RestEndpointMethodTypes['issues']['getMilestone']['response']['data']