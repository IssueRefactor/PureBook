import {renderMarkdown} from '@astrojs/markdown-remark'



export const renderMd = (content: string) => {

    return renderMarkdown(`# Title
${content}`, {})

}