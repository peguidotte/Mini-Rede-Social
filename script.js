document.addEventListener('DOMContentLoaded', function() {
    const btn_criar_post = document.querySelector('#post-btn');
    const postsList = document.querySelector('#posts');
    const selectCategoria = document.querySelector('#selecionar-categorias');
    const categoriesSet = new Set(); 

    btn_criar_post.addEventListener('click', function(event) {
        event.preventDefault();

        const postText = document.querySelector('#post-texto').value.trim();
        const postCategory = document.querySelector('#post-categorias').value.trim();
        const imageUrls = Array.from(document.querySelectorAll('.post__imagem'))
                              .map(input => input.value.trim())
                              .filter(url => url);

        if (postText === '' || postCategory === '') {
            alert('Por favor, insira o texto e a categoria do post.');
            return;
        }

        
        categoriesSet.add(postCategory);
        updateCategoryOptions();

        const postElement = document.createElement('li');
        postElement.classList.add('post-item');

        let postContent = `<p class="post-text">${postText}</p>`;
        if (imageUrls.length > 0) {
            postContent += `
                <div class="carousel">
                    <div class="carousel-inner">
                        ${imageUrls.map(url => `<img src="${url}" class="carousel-item" alt="Imagem do post">`).join('')}
                    </div>
                    <button class="prev" onclick="prevSlide(this)">&#10094;</button>
                    <button class="next" onclick="nextSlide(this)">&#10095;</button>
                </div>`;
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
        document.querySelector('#post-categorias').value = 'Todos';
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

    selectCategoria.addEventListener('change', function() {
        const categoriaSelecionada = selectCategoria.value;
        const postItems = document.querySelectorAll('.post-item');

        postItems.forEach(function(postItem) {
            const postCategoria = postItem.querySelector('.post-category').textContent;

            if (categoriaSelecionada === "Todos" || categoriaSelecionada === postCategoria) {
                postItem.style.display = 'block';
            } else {
                postItem.style.display = 'none';
            }
        });
    });

    function updateCategoryOptions() {
        const currentSelection = selectCategoria.value;
        selectCategoria.innerHTML = '<option value="Todos">Todos</option>';
        categoriesSet.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            selectCategoria.appendChild(option);
        });
        selectCategoria.value = currentSelection;
    }

    function getCurrentDate() {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    window.prevSlide = function(element) {
        const carouselInner = element.closest('.carousel').querySelector('.carousel-inner');
        const items = carouselInner.querySelectorAll('.carousel-item');
        carouselInner.prepend(items[items.length - 1]);
    };

    window.nextSlide = function(element) {
        const carouselInner = element.closest('.carousel').querySelector('.carousel-inner');
        const items = carouselInner.querySelectorAll('.carousel-item');
        carouselInner.append(items[0]);
    };
});
