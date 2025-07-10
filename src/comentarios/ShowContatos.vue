<template>
  <div class="container">
    <h1 class="titulo">📋 Lista de Contatos</h1>
    <!-- retorno da API -->
    <div v-if="this.ApiMensagem" class="mensagem">
      {{ this.ApiMensagem }}
    </div>
    <ul class="lista-contatos">
      <li v-for="contato in contatos" :key="contato.id" class="card-contato">
        <p><strong>👤 Nome:</strong> {{ contato.username }}</p>
        <p><strong>💬 Comentário:</strong> {{ contato.comentario }}</p>
        <p><strong>📞 Telefone:</strong> {{ contato.tel }}</p>

        <div class="botoes">
          <button class="btn editar" @click="editarContato(contato)">✏️ Editar</button>
          <button class="btn excluir" @click="deletarId(contato.id)">🗑️ Excluir</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../service/api';

export default {
  name: 'ShowContatos',
  data() {
    return {
      contatos: [],
      ApiMensagem: null // Variável para armazenar mensagens da API 
    };
  },
  mounted() {
    this.buscarContatos();
  },
  methods: {
    async buscarContatos() {
      try {
        const response = await api.get('/API/Contatos/Buscar');
        this.contatos = response.data;
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    },
    async deletarId(id) {
      try {
        await api.delete(`/API/Contatos/Delete/${id}`);
        this.ApiMensagem = "Usuário deletado com sucesso!";
        this.buscarContatos(); // Atualiza a lista sem recarregar a página
      } catch (error) {
        console.error('Erro ao deletar contato:', error);
      }
    },
    editarContato(contato) {      
      // Emite evento para o componente pai (App.vue)
      this.$emit('ContactDataFilho', contato);
    }
  }

};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.titulo {
  text-align: center;
  margin-bottom: 1.8rem;
  font-weight: 700;
  font-size: 1.8rem;
  color: #2563eb;
}

.lista-contatos {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.card-contato {
  background-color: #fff;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.2rem;
  transition: all 0.3s ease;
}

.card-contato:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border-color: #3b82f6;
}

.card-contato p {
  margin: 0.8rem 0;
  color: #374151;
  font-size: 1rem;
  line-height: 1.5;
}

.card-contato strong {
  color: #1f2937;
  font-weight: 600;
}

.botoes {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.2rem;
}

.btn {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.btn.editar {
  background-color: #3b82f6;
  color: #fff;
}

.btn.editar:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn.excluir {
  background-color: #ef4444;
  color: #fff;
}

.btn.excluir:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}
.mensagem {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

/* Responsividade */
@media (max-width: 640px) {
  .container {
    margin: 1rem;
    padding: 1.5rem 1rem;
  }
  
  .titulo {
    font-size: 1.5rem;
  }
  
  .card-contato {
    padding: 1rem;
  }
  
  .botoes {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
