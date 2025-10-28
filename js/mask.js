document.addEventListener('DOMContentLoaded', () => {

  const cpfInput = document.getElementById('cpf');
  const telefoneInput = document.getElementById('telefone');
  const cepInput = document.getElementById('cep');

  if (cpfInput) {
    cpfInput.addEventListener('input', () => {
      let value = cpfInput.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0,11);
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      cpfInput.value = value;
    });
  }

  if (telefoneInput) {
    telefoneInput.addEventListener('input', () => {
      let value = telefoneInput.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0,11);
      value = value.replace(/^(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      telefoneInput.value = value;
    });
  }

  if (cepInput) {
    cepInput.addEventListener('input', () => {
      let value = cepInput.value.replace(/\D/g, '');
      if (value.length > 8) value = value.slice(0,8);
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      cepInput.value = value;
    });
  }

});
