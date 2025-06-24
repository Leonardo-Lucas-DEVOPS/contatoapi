<template>
  <div class="container">
    <h1 class="titulo">📋 Lista de Contatos</h1>
    <ul class="lista-contatos">
      <li v-for="contato in contatos" :key="contato.id" class="card-contato">
        <p><strong>👤 Nome:</strong> {{ contato.username }}</p>
        <p><strong>💬 Comentário:</strong> {{ contato.comentario }}</p>
        <p><strong>📞 Telefone:</strong> {{ contato.tel }}</p>

        <div class="botoes">
          <button class="btn editar">✏️ Editar</button>
          <button class="btn excluir" @click="deletarId(contato.id)">🗑️ Excluir</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../service/api';

export default {
  name: 'TestApi',
  data() {
    return {
      contatos: []
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
        console.log(this.contatos)
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    },
    async deletarId(id) {
      try {
        await api.delete(`/API/Contatos/Delete/${id}`);
        alert("Usuário deletado com sucesso!");
        location.reload(); // Recarrega a página após o alerta
      } catch (error) {
        console.error('Erro ao deletar contato:', error);
      }
    }
  }

};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.titulo {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
}

.lista-contatos {
  list-style-type: none;
  padding: 0;
}

.card-contato {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-contato:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-contato p {
  margin: 8px 0;
  color: #555;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card-contato strong {
  color: #222;
}

.botoes {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s, color 0.2s;
}

.btn.editar {
  background-color: #007bff;
  color: #fff;
}

.btn.editar:hover {
  background-color: #0056b3;
}

.btn.excluir {
  background-color: #dc3545;
  color: #fff;
}

.btn.excluir:hover {
  background-color: #a71d2a;
}
</style>
