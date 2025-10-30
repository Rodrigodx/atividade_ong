export function enviarFormulario(payload) {
    return new Promise((resolve, reject) => {
        const latency = 700 + Math.random() * 600;

        setTimeout(() => {
            if(Math.random() < 0.05) {
                reject(new Error('Erro de rede simulado'));
                return;
            }

            if (payload && payload.nome && payload.email) {
                const created = {
                    id: Math.floor(Math.random() * 900000) + 1000,
                    ...payload,
                    data_criacao: new Date().toISOString()
                };
                resolve({ ok: true, status: 201, data: created });
            } else {
                resolve({ ok: false, status: 400, data: { message: 'Dados incompletos' } });
            }
        }, latency);
    });
}

export function getUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

