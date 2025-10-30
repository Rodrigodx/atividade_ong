document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formCadastro");
    const errorBox = document.getElementById("formErrors");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const cep = document.getElementById("cep").value.trim();

        let errors = [];

        if (!nome) errors.push("O nome é obrigatório.");
        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.push("E-mail inválido.");
        if (!cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) errors.push("CPF inválido");
        if (telefone.length < 14) errors.push("Telefone incompleto.");
        if (!cep.match(/^\d{5}-\d{3}$/)) errors.push("CEP inválido.");

        if (errors.length > 0) {
            errorBox.style.display = "block";
            errorBox.innerHTML = errors.join("<br>");
            return;
        }

        errorBox.style.display = "none";

        alert("Cadastro válido! Salvando dados...");
        form.reset()

    });

});