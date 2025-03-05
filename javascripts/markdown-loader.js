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
  // 为了更好地支持Markdown语法，我们实现一个更完善的解析器
  let htmlContent = markdownContent;
  
  // 处理代码块
  htmlContent = htmlContent.replace(/```([\s\S]*?)```/g, function(match, code) {
    const lines = code.trim().split('\n');
    let language = '';
    if (lines[0] && !lines[0].startsWith('    ')) {
      language = lines[0];
      lines.shift();
    }
    return `<pre><code class="language-${language}">${lines.join('\n')}</code></pre>`;
  });
  
  // 处理标题并添加ID
  htmlContent = htmlContent.replace(/^(#{1,6})\s+(.+)$/gm, function(match, hashes, title) {
    const level = hashes.length;
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
    return `<h${level} id="${id}">${title}</h${level}>`;
  });
  
  // 处理粗体和斜体
  htmlContent = htmlContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  htmlContent = htmlContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // 处理链接
  htmlContent = htmlContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // 处理列表
  htmlContent = htmlContent.replace(/^\s*-\s+(.+)$/gm, '<li>$1</li>');
  htmlContent = htmlContent.replace(/(<li>.+<\/li>\n)+/g, '<ul>$&</ul>');
  htmlContent = htmlContent.replace(/^\s*(\d+)\.\s+(.+)$/gm, '<li>$2</li>');
  htmlContent = htmlContent.replace(/(<li>.+<\/li>\n)+/g, '<ol>$&</ol>');
  
  // 处理段落
  htmlContent = htmlContent.replace(/^([^<].+)$/gm, '<p>$1</p>');
  
  // 清理多余的标签
  htmlContent = htmlContent.replace(/<p><\/p>/g, '');
  htmlContent = htmlContent.replace(/<p><(h|ul|ol|pre)/g, '<$1');
  htmlContent = htmlContent.replace(/<\/(h|ul|ol|pre)><\/p>/g, '</$1>');
  
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