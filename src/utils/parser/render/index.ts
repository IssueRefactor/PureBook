
import type { MarkdownHeading } from "@models/application";
import MarkdownIt from 'markdown-it'


const mdRender = new MarkdownIt('commonmark')
export const renderMarkdown = (md: string) => {
    return mdRender.render(md)
}

export const renderHeadings = (html: string) => {
    const regex = /<(h[1-3])((.*=.*)+)?>(.*)<\/\1>/gms
    return html.match(regex)?.map(matchedHeadingTag => {
        const matchedGroups = regex.exec(matchedHeadingTag)!;
        const tag = matchedGroups[1];
        const heading = matchedGroups[4];

        return {
            heading,
            depth: parseInt(tag[1])
        } as MarkdownHeading
    })
}