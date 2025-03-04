// markdown-loader.js

async function loadMarkdownContent(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading Markdown file:', error);
    return null;
  }
}

function renderMarkdown(markdownContent) {
  // 这里我们需要一个Markdown解析库，比如marked.js
  // 为了简单起见，这里只做一个基本的转换
  const htmlContent = markdownContent
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>');
  return htmlContent;
}

async function displayMarkdownContent(filePath, targetElementId) {
  const markdownContent = await loadMarkdownContent(filePath);
  if (markdownContent) {
    const htmlContent = renderMarkdown(markdownContent);
    document.getElementById(targetElementId).innerHTML = htmlContent;
  } else {
    document.getElementById(targetElementId).innerHTML = '<p>Failed to load content.</p>';
  }
}

// 导出函数以便在其他文件中使用
window.displayMarkdownContent = displayMarkdownContent;