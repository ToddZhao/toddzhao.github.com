function loadSidebarNav() {
  const categories = {
    'frontend': {
      title: '前端开发',
      articles: [
        { title: 'React入门指南', url: '/posts/getting-started-with-react.html' }
      ]
    },
    'java': {
      title: 'Java 从入门到精「放」通「弃」',
      articles: [
        { title: 'Java基础知识全解析', url: '/posts/java-basics.html' }
      ]
    },
    'devops': {
      title: 'DevOps',
      articles: [
        { title: 'Docker最佳实践', url: '/posts/docker-best-practices.html' }
      ]
    },
    'architecture': {
      title: '架构设计',
      articles: [
        { title: '微服务架构设计', url: '/posts/microservices-architecture.html' }
      ]
    }
  };

  function getCurrentCategory() {
    const path = window.location.pathname;
    for (const key in categories) {
      if (path.includes(`/posts/${key}/`) || categories[key].articles.some(article => article.url === path)) {
        return key;
      }
    }
    return null;
  }

  function createSidebarNav() {
    const currentCategory = getCurrentCategory();
    if (!currentCategory) return;

    const category = categories[currentCategory];
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar-nav';
    
    const title = document.createElement('h3');
    title.textContent = category.title;
    sidebar.appendChild(title);

    const articleList = document.createElement('ul');
    category.articles.forEach(article => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = article.url;
      a.textContent = article.title;
      if (article.url === window.location.pathname) {
        a.className = 'active';
      }
      li.appendChild(a);
      articleList.appendChild(li);
    });
    sidebar.appendChild(articleList);

    const section = document.querySelector('section');
    section.insertBefore(sidebar, section.firstChild);
  }

  createSidebarNav();
}

document.addEventListener('DOMContentLoaded', loadSidebarNav);