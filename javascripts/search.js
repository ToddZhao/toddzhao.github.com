document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const postItems = document.querySelectorAll('.post-item');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      postItems.forEach(function(item) {
        const title = item.querySelector('h3 a').textContent.toLowerCase();
        const excerpt = item.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = item.querySelector('.tags') ? item.querySelector('.tags').textContent.toLowerCase() : '';
        
        // 检查文章标题、摘要或标签是否包含搜索词
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});