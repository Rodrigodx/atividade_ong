import { validarFormulario } from './validacaoFormulario.js';
import { enviarFormulario, getUsuarios } from './api.js';
import { showError, showSuccess } from './mansagens.js';

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formCadastro");
    const errorBox = document.getElementById("formErrors");
    const submitBtn = form.querySelector('button[type="submit"]');

    exibirUsuarios(); 

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const payload = {
            nome: document.getElementById("nome").value.trim(),
            email: document.getElementById("email").value.trim(),
            cpf: document.getElementById("cpf").value.trim(),
            telefone: document.getElementById("telefone").value.trim(),
            cep: document.getElementById("cep").value.trim()
        };

        const errors = validarFormulario(payload);
        if (errors.length > 0) {
            showError(errorBox, errors.join('<br>'));
            return;
        }

        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.classList.add('loading');

        try {
            const response = await enviarFormulario(payload);
            if (!response.ok) throw new Error(response.data?.message || `Erro ${response.status}`);

            const usuarios = getUsuarios();
            usuarios.push(response.data);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            showSuccess(errorBox, `Usuário ${response.data.nome} criado com ID ${response.data.id}.`);
            form.reset();
            exibirUsuarios();
        } catch (err) {
            showError(errorBox, `Falha ao enviar: ${err.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
        }
    });
});

function exibirUsuarios() {
    const lista = document.getElementById('usuariosLista');
    const usuarios = getUsuarios();

    if (!lista) return;

    if (usuarios.length === 0) {
        lista.innerHTML = "<p>Nenhum usuário cadastrado ainda.</p>";
        return;
    }

    lista.innerHTML = usuarios.map(u => `
        <div class="usuario-card">
            <strong>${u.nome}</strong> (${u.email})<br>
            CPF: ${u.cpf}, Telefone: ${u.telefone}, CEP: ${u.cep}<br>
            Criado em: ${new Date(u.data_criacao).toLocaleString()}
        </div>
    `).join('');
}
