"use client";
import { useEffect } from "react";

export interface Post {
  description?: string;
  contentHtml: string | undefined;
}

export default function Article({ post }: { post: Post }) {
  useEffect(() => {
    document.querySelectorAll("pre").forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code) return;
      if (pre.querySelector(".copy-btn")) return;

      const lang = (code.className.match(/language-(\w+)/) || [])[1] || "text";

      const btn = document.createElement("button");
      btn.innerHTML = `
        <span class="lang-text">${lang}</span>
        <svg class="copy-icon w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      `;
      btn.className = `
        copy-btn absolute top-2 right-2
        bg-muted text-foreground
        dark:bg-muted dark:text-foreground
        text-xs px-2 py-1 rounded
        border border-border
        hover:bg-accent hover:text-accent-foreground
        z-10 flex items-center
        cursor-pointer
      `;

      const codeLines = code.innerText
        .split("\n")
        .filter((line) => line.trim() !== "");
      const isSingleLine = codeLines.length <= 1;

      btn.onclick = async () => {
        await navigator.clipboard.writeText(code.innerText);
        const langText = btn.querySelector(".lang-text") as HTMLElement;
        const copyIcon = btn.querySelector(".copy-icon") as HTMLElement;
        if (langText && copyIcon) {
          langText.textContent = "Copied!";
          copyIcon.style.display = "none";
          setTimeout(() => {
            langText.textContent = lang;
            copyIcon.style.display = "block";
          }, 1500);
        }
      };

      if (isSingleLine) {
        btn.style.top = "50%";
        btn.style.transform = "translateY(-50%)";
      }

      const wrapper = document.createElement("div");
      wrapper.className = "relative w-full";

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      pre.classList.add("relative");

      const preStyles = `
        position: relative !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        white-space: pre !important;
        word-wrap: normal !important;
        overflow-wrap: normal !important;
        word-break: normal !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        display: block !important;
        box-sizing: border-box !important;
        -webkit-overflow-scrolling: touch !important;
      `;

      pre.style.cssText = (pre.style.cssText || "") + preStyles;

      if (code) {
        const codeStyles = `
          white-space: pre !important;
          word-wrap: normal !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          display: inline-block !important;
          min-width: max-content !important;
          width: auto !important;
          box-sizing: border-box !important;
        `;
        code.style.cssText = (code.style.cssText || "") + codeStyles;
      }

      wrapper.appendChild(btn);
    });
  }, [post.contentHtml]);

  return (
    <article
      className="
        prose prose-base prose-stone dark:prose-invert
        prose-p:leading-5
        prose-li:leading-5
        prose-blockquote:leading-5
        max-w-none w-full
        prose-headings:text-foreground
        prose-p:text-foreground
        prose-strong:text-foreground
        prose-code:text-foreground
        prose-blockquote:text-foreground
        prose-li:text-foreground
        prose-a:text-primary hover:prose-a:text-primary/80
        prose-blockquote:border-l-primary
        prose-table:w-full prose-table:border-collapse prose-table:my-6
        prose-thead:border-b prose-thead:border-border
        prose-th:text-left prose-th:py-3 prose-th:px-4 prose-th:font-medium
        prose-th:text-sm prose-th:text-muted-foreground
        prose-td:py-3 prose-td:px-4 prose-td:text-sm
        prose-tr:border-b prose-tr:border-border last:prose-tr:border-0
        prose-code:before:content-none prose-code:after:content-none
        prose-code:bg-muted prose-code:py-0.5
        prose-code:rounded prose-code:text-sm prose-code:font-mono
        prose-pre:bg-muted prose-pre:border prose-pre:border-border
        prose-pre:rounded-lg
        prose-pre:!overflow-x-auto prose-pre:!overflow-y-hidden
        prose-pre:!w-full prose-pre:!max-w-full prose-pre:!min-w-0
        prose-pre:!whitespace-pre prose-pre:!break-normal
        prose-pre:!word-wrap-normal prose-pre:!overflow-wrap-normal
        prose-h1:text-xl sm:prose-h1:text-xl lg:prose-h1:text-3xl
        prose-h2:text-lg sm:prose-h2:text-lg lg:prose-h2:text-2xl
        prose-h3:text-base sm:prose-h3:text-base lg:prose-h3:text-xl
        prose-h4:text-sm sm:prose-h4:text-sm lg:prose-h4:text-lg
        prose-h5:text-xs sm:prose-h5:text-xs lg:prose-h5:text-base
        prose-h6:text-xs sm:prose-h6:text-xs lg:prose-h6:text-sm
        prose-h1:mt-4 prose-h2:mt-6 prose-h3:mt-5
        prose-h4:mt-4 prose-h5:mt-4 prose-h6:mt-4
        mb-12
      "
      dangerouslySetInnerHTML={{
        __html: `
          ${post.description ? `<p class="mt-4">${post.description}</p>` : ""}
          ${post.contentHtml}
        `,
      }}
    />
  );
}
