document.addEventListener('DOMContentLoaded', async () => {
    try {
        const blogId = 'pltestepl.blogspot.com';
        const apiKey = 'AIzaSyCVatSHZzIgqdGHN5YgyzJT_63x7cl7epw';
        const maxResultados = 3;
        
        const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/byurl?url=https://${blogId}&key=${apiKey}`;
        
        const resposta = await fetch(apiUrl);
        const blogDados = await resposta.json();

        if (!blogDados.id) {
            throw new Error('Não foi possível encontrar o portal');
        }

        const postsUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogDados.id}/posts?maxResults=${maxResultados}&key=${apiKey}`;
        const postsResposta = await fetch(postsUrl);
        const postsDados = await postsResposta.json();
        
        const postsContainer = document.getElementById('blogPosts');
        postsContainer.innerHTML = '';
        
        if (postsDados.items && postsDados.items.length > 0) {
            postsDados.items.forEach(post => {
                let imgSrc = 'https://www.prolog.ao/assets/images/logo.webp';
                const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch && imgMatch[1]) {
                    imgSrc = imgMatch[1];
                }
                
                let summary = post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...';
                
                const publishDate = new Date(post.published);
                const formattedDate = publishDate.toLocaleDateString('pt-AO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                
                const postElement = document.createElement('div');
                postElement.className = 'post-card';
                postElement.innerHTML = `
                    <div class="post-image">
                        <img src="${imgSrc}" alt="${post.title}" loading="lazy">
                    </div>
                    <div class="post-content">
                        <h3>${post.title}</h3>
                        <p class="post-date">${formattedDate}</p>
                        <p class="post-summary">${summary}</p>
                        <a href="${post.url}" class="read-more" target="_blank">Ler mais</a>
                    </div>
                `;
                
                postsContainer.appendChild(postElement);
            });
        } else {
            postsContainer.innerHTML = '<p>Nenhuma publicação encontrada.</p>';
        }
    } catch (error) {
        console.error('Erro ao buscar publicações do blog:', error);
        document.getElementById('blogPosts').innerHTML = `
            <p>Não foi possível carregar as publicações no momento. 
            Visite nosso <a href="https://portal.prolog.ao" class="text-blue-100" target="_blank">portal</a> diretamente.</p>
        `;
    }
});