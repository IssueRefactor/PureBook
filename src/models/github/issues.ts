import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type Issue = RestEndpointMethodTypes['issues']['get']['response']['data']
export type Milestone = RestEndpointMethodTypes['issues']['getMilestone']['response']['data']