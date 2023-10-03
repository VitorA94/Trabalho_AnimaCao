function salvarCadastro() {
    //obtendo os dados do formulário
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value

    //obtém o gênero que a pessoa selecionou no radio
    let genero
    if (document.getElementById('feminino').checked) {
        genero = document.getElementById('feminino').value
    }
    else if (document.getElementById('masculino').checked) {
        genero = document.getElementById('masculino').value
    }
    else if (document.getElementById('outro').checked) {
        genero = document.getElementById('outro').value
    }

    let data_nascimento = document.getElementById('data_nascimento').value

    //obtém o animal que a pessoa selecionou no checkbox
    let pet_cachorro = false
    if (document.getElementById('pet_cachorro').checked) {
        pet_cachorro = true
    }
    let pet_gato = false
    if (document.getElementById('pet_gato').checked) {
        pet_gato = true
    }
    let pet_outro = false
    if (document.getElementById('pet_outro').checked) {
        pet_outro = true
    }

    let pet_quantidade = document.getElementById('pet_quantidade').value
    let cidade = document.getElementById('cidade').value
    let estado = document.getElementById('estado').value
    let endereco = document.getElementById('endereco').value

    //criando um objeto com os dados do cadastro
    let cadastro = {
        nome: nome,
        email: email,
        telefone: telefone,
        genero: genero,
        data_nascimento: data_nascimento,
        pet_cachorro: pet_cachorro,
        pet_gato: pet_gato,
        pet_outro: pet_outro,
        pet_quantidade: pet_quantidade,
        cidade: cidade,
        estado: estado,
        endereco: endereco
    }

    //mostrar as informações salvas no console
    console.log(cadastro)

    //obtém informações já armazenadas
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

    //adicionando o cadastro ao array de cadastros. 
    cadastros.push(cadastro)

    //salva a lista atualizada no localstorage
    localStorage.setItem('cadastros', JSON.stringify(cadastros))

    //atualizar a tabela
    listarCadastros()

    //Mensagem de sucesso
    alert("O cadastro foi salvo com sucesso!")
}

function listarCadastros() {
    //obtendo os dados
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    
    //obtendo onde iremos inserir a tabela
    let tabela = document.getElementById('listagem')
    tabela.innerHTML = '' //limpamos a tabela
    //criamos uma tabela com HTML
    let table = document.createElement('table')
    table.className = 'table table-bordered'
    table.innerHTML = `<thead>
                         <tr class='table-success'>
                           <th>Nome</th>
                           <th>Email</th>
                           <th>Telefone</th>
                           <th>Gênero</th>
                           <th>Opções</th>
                         </tr>
                      </thead>
                      <tbody>
                      </tbody>   
                      `
    //preenchendo a tabela com os dados do cadastros                      
    let tbody = table.querySelector('tbody')
    for (let i = 0; i < cadastros.length; i++) {
        let cadastro = cadastros[i]
        let row = tbody.insertRow(i)
        row.innerHTML = `
                    <td>${cadastro.nome}</td>
                    <td>${cadastro.email}</td>
                    <td>${cadastro.telefone}</td>
                    <td>${cadastro.genero}</td>
                    <td><button class='btn btn-danger' 
                    onclick="apagarCadastro('${cadastro.email}')">Apagar</button></td>
    `
    }

    tabela.appendChild(table)
}

function apagarCadastro(email) {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

    //filtramos a lista de cadastros para remover com o email
    cadastros = cadastros.filter(function (cadastro) {
        return cadastro.email !== email
    })

    //atualizamos o localStorage com a nova lista de cadastros
    localStorage.setItem('cadastros', JSON.stringify(cadastros))
    
    //atualizamos a UI
    listarCadastros()
}

//chamar a função logo que carregar a página
listarCadastros()