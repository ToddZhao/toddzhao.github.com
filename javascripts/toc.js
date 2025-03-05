// toc.js - 文章目录自动生成和滚动高亮功能

document.addEventListener('DOMContentLoaded', function() {
  // 检查页面是否有目录容器
  const tocContainer = document.querySelector('.table-of-contents');
  if (!tocContainer) return;
  
  // 获取文章内容区域
  const contentArea = document.querySelector('.post-content');
  if (!contentArea) return;
  
  // 获取所有标题元素
  const headings = contentArea.querySelectorAll('h2, h3, h4');
  if (headings.length === 0) return;
  
  // 清空现有目录内容，保留标题
  const tocTitle = tocContainer.querySelector('h3');
  tocContainer.innerHTML = '';
  if (tocTitle) tocContainer.appendChild(tocTitle);
  
  // 创建目录列表
  const tocList = document.createElement('ul');
  tocContainer.appendChild(tocList);
  
  // 为每个标题创建目录项
  headings.forEach(function(heading) {
    // 为标题添加ID（如果没有）
    if (!heading.id) {
      heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
    }
    
    // 创建目录项
    const listItem = document.createElement('li');
    listItem.className = `toc-${heading.tagName.toLowerCase()}`;
    
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: heading.offsetTop - 20,
        behavior: 'smooth'
      });
    });
    
    listItem.appendChild(link);
    tocList.appendChild(listItem);
  });
  
  // 添加滚动监听，高亮当前阅读的部分
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // 找到当前可见的标题
    let currentHeading = null;
    headings.forEach(function(heading) {
      if (heading.offsetTop - 100 <= scrollPosition) {
        currentHeading = heading;
      }
    });
    
    // 移除所有高亮
    const allLinks = tocList.querySelectorAll('a');
    allLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    
    // 添加当前标题的高亮
    if (currentHeading) {
      const currentLink = tocList.querySelector(`a[href="#${currentHeading.id}"]`);
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  });
  
  // 初始触发一次滚动事件，设置初始高亮
  window.dispatchEvent(new Event('scroll'));
});