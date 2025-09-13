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
      
            agendarCliente();
            // Simular envio
          //  alert('Agendamento realizado com sucesso! Entraremos em contato para confirmação.');
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



   async function agendarCliente() {

    const cliente = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    servico: document.getElementById("servico").value, // Ex.: "CORTE_CABELO"
    data: document.getElementById("data").value,       // formato: "2025-09-11"
    profissional: document.getElementById("profissional").value, // Ex.: "JOAO"
    horario: document.getElementById("horario").value  // formato: "14:30:00"
   };

   try {
    const response = await fetch("http://localhost:8080/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    if (!response.ok) {
      throw new Error("Erro ao agendar cliente");
    }

    const data = await response.json();
    alert("Agendamento realizado com sucesso! ID: " + data.id);
    console.log("Agendamento:", data);
    limparFormularioAgendamento();

  } catch (error) {
    console.error("Erro:", error);
    alert("Não foi possível realizar o agendamento.");
  }
}
/*

// Função para salvar contato no backend
async function salvarContato(event) {
  event.preventDefault(); // evita reload da página

  // Pegando os valores do formulário
  const nomeContato = document.getElementById("nomeContato").value;
  const emailContato = document.getElementById("emailContato").value;
  const assunto = document.getElementById("assunto").value;
  const mensagem = document.getElementById("mensagem").value;

  const contato = { nomeContato, emailContato,assunto, mensagem };

  try {
    const resposta = await fetch("http://localhost:8080/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contato)
    });

    if (!resposta.ok) {
      throw new Error("Erro ao salvar contato!");
    }

    alert("Contato enviado com sucesso!");
    document.getElementById("form-contato").reset(); // limpa formulário

  } catch (erro) {
    console.error("Erro:", erro);
    alert("Não foi possível enviar o contato.");
  }
}

*/


    function enviarFormulario() {
    // Obtém os valores dos campos do formulário
    var nomeContato = document.getElementById("nomeContato").value;
    var emailContato = document.getElementById("emailContato").value;
    var assunto = document.getElementById("assunto").value;
    var mensagem = document.getElementById("mensagem").value;   
      // Validação simples
    if (!nomeContato || !emailContato || !assunto || !mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // Constrói o objeto JSON com os valores dos campos do formulário
    var dadosFormulario = {
        nomeContato: nomeContato,
        emailContato: emailContato,
        assunto: assunto,
        mensagem: mensagem    
        
    };
    
    
    fetch("http://localhost:8080/api/contato", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosFormulario)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Dados enviados:", data);
       alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        limparFormulario()
       
    })
    .catch(error => {
        console.error("Erro ao enviar os dados:", error);
        
    });
}
function limparFormularioAgendamento() {
    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.reset(); // Limpa todos os campos
    }
}

function limparFormulario() {
    const formAgendamento = document.getElementById('form-contato');
    if (formAgendamento) {
        formAgendamento.reset(); // Limpa todos os campos
    }
}