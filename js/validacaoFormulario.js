export function validarFormulario({ nome, email, cpf, telefone, cep }) {
    let errors = [];

    if (!nome) errors.push("O nome é obrigatório.");
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.push("E-mail inválido.");
    if (!cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) errors.push("CPF inválido");
    if (telefone.length < 14) errors.push("Telefone incompleto.");
    if (!cep.match(/^\d{5}-\d{3}$/)) errors.push("CEP inválido.");

    return errors;
}
