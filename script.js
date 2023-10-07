const dadosGuardados = localStorage.getItem('dadosGuardados')

// se os dados guardados existem, eles substituirão o padrão aqui
// se não, vai esse mesmo

let json = dadosGuardados ? JSON.parse(dadosGuardados ) :
[
    {
        "id": 1,
        "name": "produto a",
        "quantity": 100
    },
    {
        "id": 2,
        "name": "produto b",
        "quantity": 50
    },
    {
        "id": 3,
        "name": "produto c",
        "quantity": 25
    },
    {
        "id": 4,
        "name": "produto d",
        "quantity": 75
    }
]

function mostrarProdutos()
{
    const listaProdutos = document.getElementById('lista-produtos')
    // limpar lista antes de recarregar
    listaProdutos.innerHTML = ''
    json.forEach(produto =>
    {
        const itemLista = document.createElement('li')
        itemLista.innerHTML = `id: ${produto.id}<br>
                               name: ${produto.name}<br>
                               quantity: ${produto.quantity}<br><br>`
        listaProdutos.appendChild(itemLista)
    })
    // guardar os valores no localstorage aqui nessa função
    // já que ela é chamada em todos os métodos que alteram o json
    localStorage.setItem('dadosGuardados', JSON.stringify(json))
}

// mostrar produtos pela primeira vez, ao abrir a página
mostrarProdutos()

function mostrarForm(formId)
{
    const forms = document.querySelectorAll('form');
    forms.forEach(form =>
    {
        form.style.display = 'none';
    });
    const formParaMostrar = document.getElementById(formId);
    formParaMostrar.style.display = 'block';
}

document
    .getElementById('button-adicionar')
    .addEventListener('click', () =>
    {
        mostrarForm('form-adicionar')
    })

document
    .getElementById('button-atualizar')
    .addEventListener('click', () =>
    {
        mostrarForm('form-atualizar')
    })

document
    .getElementById('button-deletar')
    .addEventListener('click', () =>
    {
        mostrarForm('form-deletar')
    })

function adicionar()
{
    document
        .getElementById('form-adicionar')
        .addEventListener('submit', function (event)
        {
            event.preventDefault()
            const idParaCriar = parseInt(document
                .getElementById('id-adicionar')
                .value)
            const nameParaCriar = document
                .getElementById('name-adicionar')
                .value
            const quantityParaCriar = parseInt(document
                .getElementById('quantity-adicionar')
                .value)

            const idExiste = json.some(item => item.id === idParaCriar)

            if (!idExiste)
            {
                const novoProduto =
                    {
                        "id": idParaCriar,
                        "name": nameParaCriar,
                        "quantity": quantityParaCriar
                    }
                json.push(novoProduto)
            }
            else
            {
                // pq estão saindo tantos alerts? deveria ser apenas um
                alert('id já existe, tente outro')
            }
            mostrarProdutos()
        })
}

function atualizar()
{
    document
        .getElementById('form-atualizar')
        .addEventListener('submit', function (event)
        {
            event.preventDefault()
            const idParaAtualizar = parseInt(document
                .getElementById('id-atualizar')
                .value)
            const novaQuantidade = parseInt(document
                .getElementById('quantity-atualizar')
                .value)

            // encontrar o item a partir do id informado no form
            for (let i = 0; i < json.length; i++)
            {
                if (json[i].id === idParaAtualizar)
                {
                    json[i].quantity = novaQuantidade
                    break
                }
            }
            mostrarProdutos()
        })
}

function deletar()
{
    document
        .getElementById('form-deletar')
        .addEventListener('submit', function (event)
        {
            event.preventDefault();
            const idParaDeletar = parseInt(document
                .getElementById('id-deletar')
                .value)
            json = json.filter(item => item.id !== idParaDeletar)
            mostrarProdutos()
        })
}