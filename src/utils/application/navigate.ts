const BASE_URL = import.meta.env.BASE_URL;
export const navigate = {
    to: (dest: string) => {
        return [BASE_URL, dest].join('')
    }
}