let botaoBuscar = document.getElementById("botaoBuscar");
let campoBusca = document.getElementById("campoBusca");
let listaUsuarios = document.getElementById("listaUsuarios");
let mensagemExibicao = document.getElementById("mensagemExibicao");
let usuariosData;

window.onload = listarTodos;

function listarTodos() {
  let requisicao = new XMLHttpRequest();
  requisicao.open("GET", "https://dummyjson.com/users", true);
  requisicao.onreadystatechange = function () {
    if (requisicao.readyState === 4) {
      if (requisicao.status === 200) {
        usuariosData = JSON.parse(requisicao.responseText).users;
        exibirUsuarios(usuariosData);
      } else {
        exibirMensagem("Erro ao conectar a API");
      }
    }
  };
  requisicao.send();
}

botaoBuscar.addEventListener("click", function () {
  let nomeParaBuscar = campoBusca.value.trim();
  if (nomeParaBuscar === "") {
    exibirMensagem("Por favor, digite um nome para buscar.");
    listarTodos();
    return;
  }

  let usuariosFiltrados = filtrarUsuarios(usuariosData, nomeParaBuscar);
  if (usuariosFiltrados.length > 0) {
    exibirUsuarios(usuariosFiltrados);
    exibirMensagem("Usuário(s) encontrado(s).");
  } else {
    listaUsuarios.innerHTML = "";
    exibirMensagem("Nenhum usuário encontrado.");
  }
});

function filtrarUsuarios(usuarios, letraParaBuscar) {
  return usuarios.filter((usuario) => {
    let nomeCompleto = `${usuario.firstName} ${usuario.lastName}`.toLowerCase();
    return nomeCompleto.startsWith(letraParaBuscar.toLowerCase());
  });
}

function exibirUsuarios(usuarios) {
  listaUsuarios.innerHTML = "";
  usuarios.forEach((usuario) => {
    let divUsuario = document.createElement("div");
    divUsuario.classList.add("user-container");

    let imagem = document.createElement("img");
    imagem.src = usuario.image;
    imagem.alt = `${usuario.firstName} ${usuario.lastName}`;
    divUsuario.appendChild(imagem);

    let nomeUsuario = document.createElement("p");
    nomeUsuario.textContent = `Nome: ${usuario.firstName} ${usuario.lastName}`;
    nomeUsuario.classList.add("user-name");
    divUsuario.appendChild(nomeUsuario);

    let detalhesUsuario = document.createElement("p");
    detalhesUsuario.textContent = `Gênero: ${usuario.gender}, Idade: ${usuario.age}, Email: ${usuario.email}`;
    detalhesUsuario.classList.add("user-details");
    divUsuario.appendChild(detalhesUsuario);

    listaUsuarios.appendChild(divUsuario);
  });
}

function exibirMensagem(mensagem) {
  mensagemExibicao.textContent = mensagem;
}
