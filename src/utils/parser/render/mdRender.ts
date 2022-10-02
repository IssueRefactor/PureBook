import { renderMarkdown } from "@astrojs/markdown-remark";
import * as shiki from 'shiki';
shiki.setCDN('/node_modules/shiki/')
export const renderMd = (content: string) => {
  return renderMarkdown(
    content,
    {
        
    }
  );
};
