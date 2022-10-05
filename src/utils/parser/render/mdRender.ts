import { renderMarkdown } from "@astrojs/markdown-remark";
import { navigate } from "@utils/application/navigate";
import * as shiki from 'shiki';
shiki.setCDN(navigate.to('/assets/shiki/'))
export const renderMd = (content: string) => {
  return renderMarkdown(
    content,
    {
    }
  );
};
