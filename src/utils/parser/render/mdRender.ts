import MarkDown from 'markdown-it'

const md = new MarkDown({
    html: true,
    linkify: true,
    typographer: true
});

export const renderMd = (content: string) => {
    return md.render(content)

}