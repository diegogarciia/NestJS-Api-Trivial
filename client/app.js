const API_URL = "http://localhost:9090/api"; 

async function crearUsuario() {
  const id = document.getElementById("usuario-id").value;
  const nombre = document.getElementById("usuario-nombre").value;
  const edad = document.getElementById("usuario-edad").value;

  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id: Number(id), nombre, edad: Number(edad)})
  });

  alert(await res.json());
  listarUsuarios();
}

async function listarUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  const data = await res.json();
  document.getElementById("usuarios-listado").textContent = JSON.stringify(data, null, 2);
}

async function actualizarUsuario() {
  const uid = document.getElementById("usuario-uid").value;
  const nombre = document.getElementById("usuario-nombre-upd").value;
  const edad = document.getElementById("usuario-edad-upd").value;

  const res = await fetch(`${API_URL}/usuarios/${uid}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({nombre, edad: edad ? Number(edad) : undefined})
  });

  alert(await res.json());
  listarUsuarios();
}

async function eliminarUsuario() {
  const uid = document.getElementById("usuario-del-id").value;
  const res = await fetch(`${API_URL}/usuarios/${uid}`, { method: "DELETE" });
  alert(await res.json());
  listarUsuarios();

  
}
