import { HttpMethod } from "../../constants/request"

const isDev = import.meta.env.DEV

type InitRequest = RequestInit & {
    origin?: boolean
}

const DEFAULT_HEADERS = {
    'Accept': 'application/vnd.github+json',
    // Don't worry. user_name and access_token will just used in node js environment, and will not leak to client
    'Authorization': 'Basic ' + btoa(import.meta.env.PURE_BOOK_USER_NAME + ":" + import.meta.env.PURE_BOOK_ACCESS_TOKEN)
}

const request = <T>(resource: RequestInfo | URL, options?: InitRequest) => {

    const headers = {
        ...DEFAULT_HEADERS,
        ...options?.headers
    }
    return new Promise<T>((resolve, reject) => {
        fetch(resource, {...options, headers}).then(res => {
            resolve(options?.origin ? (res as unknown as T) : res.json());
        }).catch(reject);
    })
}

request.get = <T>(resource: RequestInfo | URL, options?: InitRequest) => {
    return request<T>(resource, {
        method: HttpMethod.GET,
        ...options
    })
}

request.post = <T>(resource: RequestInfo | URL, options?: InitRequest) => {
    return request<T>(resource, {
        method: HttpMethod.POST,
        ...options
    })
}
export default request;