document.addEventListener('DOMContentLoaded', () => {
    const hoje = new Date()
    const mes = hoje.getMonth()
    if (mes == 11) {
        const logo = document.querySelector('#logotipo');
        logo.src = '/assets/logos/prologNatal.png'
    }
})