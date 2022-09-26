export const navigate = {
    to: (dest: string) => {
        return [import.meta.env.BASE_URL, dest].join('')
    }
}