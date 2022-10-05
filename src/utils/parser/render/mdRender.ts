import { renderMarkdown } from "@astrojs/markdown-remark";
import * as shiki from 'shiki';
shiki.setCDN('https://cdn.jsdelivr.net/npm/shiki@0.11.1/')
export const renderMd = (content: string) => {
  return renderMarkdown(
    content,
    {
    }
  );
};
