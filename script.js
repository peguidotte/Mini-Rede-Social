document.addEventListener('DOMContentLoaded', function() {
    const btn_criar_post = document.querySelector('#post-btn');
    const postsList = document.querySelector('#posts');

    btn_criar_post.addEventListener('click', function(event) {
        event.preventDefault();

        const postText = document.querySelector('#post-texto').value.trim();
        const postCategory = document.querySelector('#post-categorias').value;
        console.log(postCategory)
        const imageUrls = Array.from(document.querySelectorAll('.post__imagem'))
                              .map(input => input.value.trim())
                              .filter(url => url);

        if (postText === '') {
            alert('Por favor, insira o texto do post.');
            return;
        }

        const postElement = document.createElement('li');
        postElement.classList.add('post-item');

        let postContent = `<p class="post-text">${postText}</p>`;
        if (imageUrls.length > 0) {
            postContent += `<img src="${imageUrls[0]}" alt="Imagem do post" width="70%"`;
        }
        postContent += `
            <div class="post-meta">
                <span class="post-category">${postCategory}</span>
                <span class="post-date">${getCurrentDate()}</span>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;
        postElement.innerHTML = postContent;

        postsList.prepend(postElement);

        document.querySelector('#post-texto').value = '';
        document.querySelector('#post-categorias').value = '';
        document.querySelectorAll('.post__imagem').forEach(input => input.value = '');
    });

    postsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const postItem = event.target.closest('.post-item');
            const postTextElement = postItem.querySelector('.post-text');
            const currentText = postTextElement.textContent;

            const editTextArea = document.createElement('textarea');
            editTextArea.value = currentText;
            postTextElement.replaceWith(editTextArea);

            event.target.textContent = 'Salvar';
            event.target.classList.remove('edit-btn');
            event.target.classList.add('save-btn');
        } else if (event.target.classList.contains('save-btn')) {
            const postItem = event.target.closest('.post-item');
            const editTextArea = postItem.querySelector('textarea');
            const updatedText = editTextArea.value.trim();

            const postTextElement = document.createElement('p');
            postTextElement.classList.add('post-text');
            postTextElement.textContent = updatedText;

            editTextArea.replaceWith(postTextElement);

            event.target.textContent = 'Editar';
            event.target.classList.remove('save-btn');
            event.target.classList.add('edit-btn');
        } else if (event.target.classList.contains('delete-btn')) {
            const postItem = event.target.closest('.post-item');
            if (confirm('Tem certeza de que deseja excluir este post?')) {
                postItem.remove();
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Seletor do elemento select que representa as categorias
        const selectCategoria = document.querySelector('#selecionar-categorias');
        console.log(`selectCategoria ${selectCategoria}`)
                selectCategoria.addEventListener('change', function() {
            
            const categoriaSelecionada = selectCategoria.value;
    
            
            const postItems = document.querySelectorAll('.post-item');
    
            // Quase um "for in range" de python
            postItems.forEach(function(postagemItem) {
                
                const postCategoria = postagemItem.querySelector('.post-category').textContent;
                console.log (`postCategoria ${postCategoria}`)
                
                if (categoriaSelecionada === "Todos" || categoriaSelecionada === postCategoria) {
                    postagemItem.style.display = 'block';
                } else {
                    postagemItem.style.display = 'none';
                }
            });
        });
    
        
    });

    function getCurrentDate() {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
});


