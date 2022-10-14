import {
  getRepositoryIssue,
  listRepositoryIssueComments,
} from "@utils/request/github";
import EmptyIcon from "@assets/empty.svg";
import { createSignal, onMount } from "solid-js";
import PageContent from "@components/PageContent/PageContent";
import RightSidebar from "@components/RightSidebar/RightSidebar";
import type { MarkdownHeading } from "@models/application";
import type { Comments } from "@models/github";
import GitComments from "@components/GitComments/GitComments";
import { renderHeadings, renderMarkdown } from "@utils/parser/render";
type DynamicMDProps = {
  issueUrl: string;
  commentsUrl: string;
  originNote?: string | null;
  title?: string;
  originHeading?: MarkdownHeading[];
};

export default ({
  issueUrl,
  commentsUrl,
  originNote,
  title,
  originHeading,
}: DynamicMDProps) => {
  const [html, setHtml] = createSignal<string | undefined | null>(originNote);
  const [comments, setComments] = createSignal<Comments>();

  const [headings, setHeadings] = createSignal<MarkdownHeading[] | undefined>(
    originHeading
  );
  onMount(async () => {
    const [note, comments] = await Promise.all([
      getRepositoryIssue(issueUrl),
      listRepositoryIssueComments(commentsUrl),
    ]);
    const html = renderMarkdown(note?.body || "");
    setHtml(html);
    setHeadings(renderHeadings(html));
    setComments(comments);
  });

  if (!html()) {
    return <img src={EmptyIcon} width="360" height="360" />;
  }
  return (
    <>
      <div id="grid-main" class="grow flex items-center p-4">
        <PageContent title={title} headings={headings()} githubEditUrl={""}>
          {/* @ts-ignore innerHTML is solid.js attribute. refer: https://www.solidjs.com/docs/latest/api#innerhtmltextcontent */}
          <div class="markdown-body" innerHTML={html()}></div>
          <div class="mt-16">
            <GitComments comments={comments()} />
          </div>
        </PageContent>
      </div>
      <aside
        id="grid-right"
        class="grid-sidebar w-72 sticky top-0 hidden lg:block"
        title="Table of Contents"
      >
        <RightSidebar headings={headings()} githubEditUrl={""} />
      </aside>
    </>
  );
};
