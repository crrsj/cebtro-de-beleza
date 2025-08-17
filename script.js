document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar botão voltar ao topo
    window.addEventListener('scroll', function() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Suavizar rolagem para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Abrir modal de login quando clicar no botão de login
    const loginButtons = document.querySelectorAll('.btn-login, a[href="#login"]');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.show();
        });
    });
    
    // Validação do formulário de agendamento
    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const confirmacao = document.getElementById('confirmacao');
            if (!confirmacao.checked) {
                alert('Por favor, confirme que leu e aceitou os termos de agendamento.');
                return;
            }
            
            // Simular envio
            alert('Agendamento realizado com sucesso! Entraremos em contato para confirmação.');
            this.reset();
        });
    }
    
    // Validação do formulário de contato
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // Validação do formulário de login
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login realizado com sucesso!');
            loginModal.hide();
            this.reset();
        });
    }
});