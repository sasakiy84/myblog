import { createStarryNight, common } from "@wooorm/starry-night";
import { Parent, Root, Content } from "mdast";
import { ElementContent } from "hast";
import { parseMdToMdast, extractMetaData } from "../utils/markdown";
import { h, VNode } from "vue";
import LinkCardVue from "../components/Markdown/Elements/LinkCard.vue";

export const useMarkdownParser = () => {
  const toVnode = async (
    root: Root,
    seoData: {
      title: string;
      ogpURL: string;
      description: string;
      url: string;
    }[]
  ): Promise<VNode> => {
    const markdownNode = root.children.filter((node) => node.type !== "yaml");
    const starryNightPromise = createStarryNight(common);
    const starryNight = await starryNightPromise;

    const htmlNodeHandler = (element: ElementContent): VNode | string => {
      if (element.type !== "element") return element.value;
      return h(
        element.tagName,
        element.properties,
        element.children.map((childNode) => htmlNodeHandler(childNode))
      );
    };

    const childNodeHandler = (
      node: Content,
      _parentNode: Parent,
      index: number
    ): VNode | string => {
      const { type } = node;
      if (type === "heading") {
        return h(
          `h${node.depth}`,
          node.children.map((childNode) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }
      if (type === "text") {
        return node.value;
      }
      if (type === "paragraph") {
        return h(
          "p",
          node.children.map((childNode) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }
      if (type === "list") {
        return h(
          node.ordered ? "ol" : "ul",
          node.children.map((childNode) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }
      if (type === "listItem") {
        return h(
          "li",
          node.children.map((childNode) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }
      if (type === "blockquote") {
        return h(
          "blockquote",
          node.children.map((childNode) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }
      if (type === "link") {
        console.log(seoData);
        const metadata = seoData.find((data) => data.url === node.url);
        return h(LinkCardVue, {
          url: node.url,
          title: metadata?.title || "",
          description: metadata?.description || "",
          ogpURL: metadata?.ogpURL || "",
        });
      }
      if (type === "image") {
        return h("img", { src: node.url, alt: node.alt ?? "" });
      }
      if (type === "code") {
        const scope = starryNight.flagToScope(node.lang ?? "");
        if (scope === undefined) return h("pre", node.value);
        const fragment = starryNight.highlight(node.value, scope);
        const preBlock = h(
          "pre",
          fragment.children.map((codeNode) => {
            if (codeNode.type !== "doctype") return htmlNodeHandler(codeNode);
            return "";
          })
        );

        return h(
          "div",
          {
            class: [
              "highlight",
              "highlight-" + scope.replace(/^source\./, "").replace(/\./g, "-"),
            ],
          },
          preBlock
        );
      }
      if (type === "inlineCode") {
        return h("code", node.value);
      }
      if (type === "emphasis") {
        return h(
          "em",
          node.children.map((childNode) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }
      if (type === "strong") {
        return h(
          "strong",
          node.children.map((childNode) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }
      if (type === "table") {
        return h(
          "table",
          node.children.map((childNode, index) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }
      if (type === "tableRow") {
        return h(
          "tr",
          node.children
            .map((childNode) => {
              // table heading の判定などに使う
              childNode.data = { tableRowNumber: index };
              return childNode;
            })
            .map((childNode) => childNodeHandler(childNode, node, index))
        );
      }
      if (type === "tableCell") {
        return h(
          node.data?.tableRowNumber === 0 ? "th" : "td",
          node.children.map((childNode, index) =>
            childNodeHandler(childNode, node, index)
          )
        );
      }

      return "aaa";
    };

    return h(
      "div",
      { id: "root" },
      markdownNode.map((childNode, index) => {
        return childNodeHandler(childNode, root, index);
      })
    );
  };

  return {
    parseMdToMdast,
    toVnode,
    extractMetaData,
  };
};
