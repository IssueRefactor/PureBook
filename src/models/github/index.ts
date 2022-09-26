export type RateLimit = {
    
        "message": string,
        "documentation_url": string,
    
}

export type RestEndType<T> = T | RateLimit

export * from './issues'