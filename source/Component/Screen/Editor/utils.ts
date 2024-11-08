// utils.ts

export const NotAlphanumericRegex: RegExp = /[^a-z0-9]/i;

export function getCurrentLine(contentToCopy: string, node: Node): string {
  if (!contentToCopy || !node) return "";
  const lines = contentToCopy.split("\n");
  const lineIndex = getCurrentLineIndex(node);
  return lines[lineIndex] || "";
}

export function getCurrentLineIndex(node: Node): number {
  if (!node?.parentNode?.childNodes) return 0;

  let lineIndex = 0;
  let offset = 0;
  let lastChild = null;

  for (let i = 0; i < node.parentNode.childNodes.length; i++) {
    const child = node.parentNode.childNodes[i];

    if (child.textContent === "\n" && lastChild?.textContent === "\n") {
      offset += 1;
    }

    if (child === node) {
      return lineIndex - offset;
    }

    lastChild = child;
    lineIndex += 1;
  }

  return 0;
}

export function wouldCreateConsecutiveSpaces(writer: Node): boolean {
  if (!writer) return false;

  const selection = window.getSelection();
  if (!selection) return false;

  const range = selection.getRangeAt(0);
  if (!range) return false;

  const index =
    range.startContainer === writer
      ? writer.lastChild?.textContent?.length || 0
      : range.startOffset;
  const node =
    range.startContainer === writer ? writer.lastChild : range.startContainer;
  const line = node?.textContent || "";

  return line[index - 1] === " " || line[index] === " ";
}

// Changed: Modified to handle punctuation-separated words
export function getPreviousSpace(text: string, offset?: number): number {
  if (!text) return 0;
  const index = text.lastIndexOf(" ", offset);
  return index < 0 ? 0 : index + 1;
}

// Changed: Completely revised to handle punctuation boundaries
export function getNextSpace(text: string, offset: number): number {
  if (!text) return 0;

  // Look for the next punctuation or space after the current position
  let nextPunctuation = -1;
  for (let i = offset; i < text.length; i++) {
    if (text[i] === " " || NotAlphanumericRegex.test(text[i])) {
      nextPunctuation = i;
      break;
    }
  }

  // If no punctuation/space found, return end of text
  if (nextPunctuation === -1) {
    return text.length;
  }

  // If we found punctuation, only include it if it's followed by a space
  // This handles cases like "Fit-" (include the hyphen) vs "Fit-a" (stop at Fit)
  if (text[nextPunctuation] !== " " && nextPunctuation + 1 < text.length) {
    const nextChar = text[nextPunctuation + 1];
    if (nextChar !== " " && !NotAlphanumericRegex.test(nextChar)) {
      return nextPunctuation;
    }
  }

  // Otherwise find the next space
  const nextSpace = text.indexOf(" ", offset);
  return nextSpace < 0 ? text.length : nextSpace;
}

export function getTextPosition(
  editor: Node,
  currentNode: Node,
  offset: number
): number {
  let position = 0;
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    if (node === currentNode) {
      return position + offset;
    }
    position += node.textContent?.length || 0;
    node = walker.nextNode();
  }

  return position;
}

export function wrapWordsInSpans(text: string): string {
  return text
    .split(/(\s+)/)
    .map((part, index) => {
      if (part.trim().length === 0) return part;
      return `<span class="word" data-offset="${index}">${part}</span>`;
    })
    .join("");
}

export function getWordStartPosition(
  text: string,
  wordElement: HTMLElement
): number {
  const words = text.split(/(\s+)/);
  const offset = parseInt(wordElement.dataset.offset || "0", 10);
  let position = 0;

  for (let i = 0; i < offset; i++) {
    position += words[i].length;
  }

  return position;
}
