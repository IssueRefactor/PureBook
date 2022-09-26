import type { RateLimit, RestEndType } from "@models/github";

export const isRateLimit = (data: RestEndType<any>): data is RateLimit => {
    return 'message' in data && 'documentation_url' in data;
}