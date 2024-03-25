let botaoBuscar = document.getElementById("botaoBuscar");
let campoBusca = document.getElementById("campoBusca");
let listaUsuarios = document.getElementById("listaUsuarios");
let mensagemExibicao = document.getElementById("mensagemExibicao");

window.onload = listarTodos();

function listarTodos() {
  let requisicao = new XMLHttpRequest();
  requisicao.open("GET", "https://reqres.in/api/users?page=1", true);
  requisicao.onreadystatechange = function () {
    if (requisicao.readyState === 4) {
      if (requisicao.status === 200) {
        let usuarios = JSON.parse(requisicao.responseText);
        exibirUsuarios(usuarios.data);
      }
    } else {
      exibirMensagem("Erro ao requisitar a API");
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

  let requisicao = new XMLHttpRequest();
  requisicao.open("GET", "https://reqres.in/api/users?page=1", true);
  requisicao.onreadystatechange = function () {
    if (requisicao.readyState === 4) {
      if (requisicao.status === 200) {
        let usuarios = JSON.parse(requisicao.responseText);
        let usuariosFiltrados = filtrarUsuarios(
          usuarios.data,
          campoBusca.value.trim()
        );
        if (usuariosFiltrados.length > 0) {
          exibirUsuarios(usuariosFiltrados);
          exibirMensagem("Usuário(s) encontrado(s).");
        } else {
          listaUsuarios.innerHTML = "";
          exibirMensagem("Nenhum usuário encontrado.");
        }
      } else {
        exibirMensagem("Erro ao buscar usuários.");
      }
    }
  };

  requisicao.send();
});

function filtrarUsuarios(usuarios, valorBusca) {
  return usuarios.filter((usuario) =>
    usuario.first_name.toLowerCase().includes(valorBusca.toLowerCase())
  );
}

function exibirUsuarios(usuarios) {
  listaUsuarios.innerHTML = "";
  usuarios.forEach((usuario) => {
    let divUsuario = document.createElement("div");
    divUsuario.textContent = `ID: ${usuario.id}, Nome: ${usuario.first_name} ${usuario.last_name}, Email: ${usuario.email}`;
    listaUsuarios.appendChild(divUsuario);
  });
}

function exibirMensagem(mensagem) {
  mensagemExibicao.textContent = mensagem;
}
