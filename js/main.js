import { validarFormulario } from './validacaoFormulario.js';
import { enviarFormulario } from './api.js';
import { showError, showSuccess } from './mensagens.js';

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formCadastro");
    const errorBox = document.getElementById("formErrors");
    const submitBtn = form.querySelector('button[type="submit"]');

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
            showSuccess(errorBox, `Usuário ${response.data.nome} criado com ID ${response.data.id}.`);
            form.reset();
        } catch (err) {
            showError(errorBox, `Falha ao enviar: ${err.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
        }
    });

});
