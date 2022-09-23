import { HttpMethod } from "../../constants/request"

const isDev = import.meta.env.DEV

type InitRequest = RequestInit & {
    origin?: boolean
}

const request = <T>(resource: RequestInfo | URL, options?: InitRequest) => {
    return new Promise<T>((resolve, reject) => {
        fetch(resource, options).then(res => {
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