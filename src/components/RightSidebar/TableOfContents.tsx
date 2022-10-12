import type { MarkdownHeading } from "@models/application";
import { createEffect, createSignal, onMount } from "solid-js";

type ItemOffsets = {
  id: string;
  topOffset: number;
};

const TableOfContents = (props: { headings?: MarkdownHeading[] }) => {
  let itemOffsets = [];
  // FIXME: Not sure what this state is doing. It was never set to anything truthy.
  const [activeId] = createSignal<string>("");
  onMount(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll("article :is(h1, h2, h3, h4)");
      itemOffsets = Array.from(titles).map((title) => ({
        id: title.id,
        topOffset: title.getBoundingClientRect().top + window.scrollY,
      }));
    };

    getItemOffsets();
    window.addEventListener("resize", getItemOffsets);

    return () => {
      window.removeEventListener("resize", getItemOffsets);
    };
  });

  return (
    <>
      <h2 class="heading">On this page</h2>
      <ul>
        <li
          class={`heading-link depth-2 ${
            activeId() === "overview" ? "active" : ""
          }`.trim()}
        >
          <a href="#overview">Overview</a>
        </li>
        {(props.headings || [])
          .filter(({ depth }) => depth > 1 && depth < 4)
          .map((heading) => (
            <li
              class={`heading-link depth-${heading.depth} ${
                activeId() === heading.heading ? "active" : ""
              }`.trim()}
            >
              <a href={`#${heading.heading}`}>{heading.heading}</a>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TableOfContents;
