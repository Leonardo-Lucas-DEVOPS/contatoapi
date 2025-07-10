<template>
  <div class="menu">
    <!-- Nav fixo -->
    <nav class="navbar navbar-expand navbar-light bg-light px-3 fixed-nav">
      <a class="navbar-brand d-flex align-items-center" href="#" @click="paginaAtiva = 'inicio'">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Logo DOG" width="32" height="32" class="me-2" />
        DogStyle
      </a>
      <ul class="navbar-nav me-auto mb-0">
        <li class="nav-item">
          <a 
            class="nav-link" 
            href="#" 
            :class="{ active: paginaAtiva === 'inicio' }"
            @click="paginaAtiva = 'inicio'"
          >
            🏠 Início
          </a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link" 
            href="#" 
            :class="{ active: paginaAtiva === 'lista' }"
            @click="paginaAtiva = 'lista'"
          >
            📋 Lista de Contatos
          </a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link" 
            href="#" 
            :class="{ active: paginaAtiva === 'formulario' }"
            @click="paginaAtiva = 'formulario'; contatoEditando = null"
          >
            ➕ Novo Contato
          </a>
        </li>
      </ul>
    </nav>

    <!-- Conteúdo dinâmico -->
    <div class="conteudo">
      <!-- Página Inicial -->
      <div v-if="paginaAtiva === 'inicio'" class="pagina-inicio">
        <div class="hero">
          <h1>🐕 Bem-vindo ao DogStyle</h1>
          <p>Sistema de gerenciamento de contatos</p>
          <div class="botoes-hero">
            <button @click="paginaAtiva = 'lista'" class="btn btn-primary">
              📋 Ver Contatos
            </button>
            <button @click="paginaAtiva = 'formulario'; contatoEditando = null" class="btn btn-secondary">
              ➕ Novo Contato
            </button>
          </div>
        </div>
      </div>

      <!-- Lista de Contatos -->
      <ShowContatos 
        v-if="paginaAtiva === 'lista'" 
        @ContactDataFilho="iniciarEdicao"  
        ref="showContatos"
      />
      
      <!-- Formulário de Contatos -->
      <FormContatos 
        v-if="paginaAtiva === 'formulario'" 
        :StatusPage="StatusPage"  
        :ContactDataFilho="ContactDataPai"
        @contato-salvo="aoSalvarContato"
      />
    </div>
  </div>
</template>

<script>
import ShowContatos from './comentarios/ShowContatos.vue';
import FormContatos from './comentarios/FormContatos.vue';

export default {
  name: 'App',
  components: {
    ShowContatos, 
    FormContatos,
  },
  data() {
    return {
      StatusPage: {        
        Editando: false,
        Enviando: false,
      },
      paginaAtiva: 'inicio', // Controla qual página está ativa
    };
  },
  methods: {
    iniciarEdicao(contato) {
      // Inicia o modo de edição ALTERANDO o StatusPage(TITULO DE :CRIAR CONTATO PARA :EDITAR CONTATO E BUTTON DE ENVIAR PARA ATUALIZAR)
      this.StatusPage.Editando = true;//PASSA O CONTATO PARA O FORMULÁRIO
      this.ContactDataPai = { ...contato }; // Copia o contato para edição
      this.paginaAtiva = 'formulario'; // Vai para o formulário
    },
    aoSalvarContato() {
      this.contatoEditando = null; // Limpa a edição
      this.paginaAtiva = 'lista'; // Volta para a lista
      
      // Atualiza a lista se o componente estiver carregado
      this.$nextTick(() => {
        if (this.$refs.showContatos) {
          this.$refs.showContatos.buscarContatos();
        }
      });
    }
    
  }
};
</script>
<style>
/* Reset e base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.menu {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
}

/* Nav fixo */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff !important;
  border-bottom: 2px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.2rem;
  color: #2563eb !important;
  text-decoration: none;
}

.nav-link {
  color: #6b7280 !important;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  padding: 0.5rem 1rem !important;
  border-radius: 6px;
  margin: 0 0.2rem;
}

.nav-link:hover {
  color: #2563eb !important;
  background-color: #f1f5f9;
}

.nav-link.active {
  color: #2563eb !important;
  background-color: #eff6ff;
  font-weight: 600;
}

/* Conteúdo principal */
.conteudo {
  margin-top: 80px; /* Espaço para o nav fixo */
  padding: 2rem 0;
  min-height: calc(100vh - 80px);
}

/* Página inicial */
.pagina-inicio {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
}

.hero {
  text-align: center;
  max-width: 600px;
  padding: 3rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.hero h1 {
  font-size: 3rem;
  color: #2563eb;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.botoes-hero {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3);
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background-color: #4b5563;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(107, 114, 128, 0.3);
}

/* Responsividade */
@media (max-width: 768px) {
  .conteudo {
    margin-top: 70px;
    padding: 1rem 0;
  }
  
  .hero {
    margin: 1rem;
    padding: 2rem 1rem;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .botoes-hero {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
  }
  
  .navbar-nav {
    gap: 0;
  }
  
  .nav-link {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem !important;
  }
}
</style>
