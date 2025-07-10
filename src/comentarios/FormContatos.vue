<template>
  <div class="container form-container">
    <h1 class="titulo">
      📋{{ StatusPage.Editando ? 'Editar Contato' : 'Criar Contato' }}
    </h1>

    <!-- retorno da API -->
    <div v-if="this.ApiMensagem" class="mensagem">
      {{ this.ApiMensagem }}
    </div>

    <form @submit.prevent="ActionsForm()" class="form">
      <div class="form-group">
        <label for="username" class="form-label">👤 Nome:</label>
        <input type="text" id="username" v-model="DataContact.username" class="form-control"
          placeholder="Digite seu nome" />
      </div>

      <div class="form-group">
        <label for="comentario" class="form-label">💬 Comentário:</label>
        <textarea id="comentario" v-model="DataContact.comentario" required class="form-control" rows="4"
          placeholder="Escreva seu comentário"></textarea>
      </div>

      <div class="form-group">
        <label for="tel" class="form-label">📞 Telefone:</label>
        <input type="tel" id="tel" v-model="DataContact.tel" required class="form-control"
          placeholder="(11) 99999-9999" />
      </div>

      <div class="botoes-form">
        <button type="submit" class="btn-submit">
          {{ StatusPage.Enviando ? 'Salvando...' : (StatusPage.Editando ? 'Atualizar' : 'Criar') }}
        </button>
        <button 
          type="button" 
          class="btn-cancelar" 
          @click="cancelar"
          v-if="StatusPage.Editando"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../service/api";

export default {
  name: "FormContatos",
  // Oque vem de fora, do pai para o filho (EDIÇÃO DE CONTATO)
  props: {
    // o contato que vem de fora para editar DO PAI E O PAI RECEBE DO FILHO showContatos
    ContactDataFilho: {
      type: Object,
      default: () => ({
        id: 0,// SERA UMA VUNERABILIDADE ?
        username: "",
        comentario: "",
        tel: "",
      })
    },
    StatusPage: {
      type: Object,
      default: () => ({
        Editando: false,
        Enviando: false,
      })
    }
  },
  // Oque vem esta dentro (CRIAR CONTATO)
  data() {
    return {
      // Dados do contato que serão enviados para a API
      DataContact: {
        id: 0,
        username: "",
        comentario: "",
        tel: "",
      },
      // Mensagem de retorno da API 
      ApiMensagem: "",
    };
  },

  computed: {
    // Verifica se está em modo de edição
  },
  watch: {
    // Observa mudanças do ContactDataFilho e copia no DataContact
    ContactDataFilho: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if(this.StatusPage.Editando === true) {

          this.DataContact = { ...newVal };
        }else{
          this.cleanform();  
        }
      }
    },
  },
  methods: {
    //limpa os campos do formulário
    //vai para o pai
    cleanform() {
      this.DataContact = {
        id: 0,
        username: "",
        comentario: "",
        tel: "",
      };
      
      // limpa a mensagem de confirmação da API
      this.StatusPage.ApiMensagem = "";
      //reseta o estado de envio
      this.StatusPage.Enviando = false;
      this.StatusPage.Editando = false; 
    },
    ActionsForm() {
      if (this.StatusPage.Editando === false) {
        // Se estiver editando, chama a função de atualizar
        this.PostDataContact();
      } else {
        // Se não estiver editando, chama a função de criar
        this.PutDataContact();
      }
    },
    // CREATE envia o contato para a API
    async PostDataContact() {
      // visual do botão de envio
      this.StatusPage.Enviando = true;
      //envia o contato para a API
      const response = await api.post('API/Contatos/Criar', this.DataContact);
      // verifica se a resposta é 201 (Created) para exibir mensagem de sucesso
      if (response.status === 201) {

        this.ApiMensagem = "Contato criado com sucesso!";

        console.log("----------------");// mostra 201 no console
        console.log("codigo http:");
        console.log(response.status);
        console.log("----------------");// mostra "Created" no console
        console.log("erro mensage:");
        console.log(response.statusText);
        console.log("----------------");


        // reseta o estado de envio
        this.cleanform();
      } else {
        console.log("----------------");// mostra 201 no console
        console.log("codigo http:");
        console.log(response.status);
        console.log("----------------");// mostra "Created" no console
        console.log("erro mensage:");
        console.log(response.statusText);
        console.log("----------------");
      }
    },
    // UPDATE envia o contato para a API
    async PutDataContact() {
     
      //envia o contato para a API
      const response = await api.put('API/Contatos/Update/{this.DataContact.id}', this.DataContact);
      // verifica se a resposta é 200 (OK) para exibir mensagem de sucesso
      if (response.status === 200) {
        this.ApiMensagem = "Contato atualizado com sucesso!";
        console.log("----------------");// mostra 200 no console
        console.log("codigo http:");
        console.log(response.status);
        console.log("----------------");// mostra "OK" no console
        console.log("erro mensage:");
        console.log(response.statusText);
        console.log("----------------");

        // reseta o estado de envio
        this.cleanform();
      } else {
        console.log("----------------");// mostra 200 no console
        console.log("codigo http:");
        console.log(response.status);
        console.log("----------------");// mostra "OK" no console
        console.log("erro mensage:");
        console.log(response.statusText);
        console.log("----------------");
      }
    }, 
    //cancela a edição e volta para o menu 
    cancelar() {
      this.cleanform();
      this.StatusPage.Editando = false; // Reseta o estado de edição
      this.ApiMensagem = ""; // Limpa a mensagem da API
      this.$emit('contato-salvo'); // Emite evento para o pai avisando que o contato foi salvo ou cancelado
    }
  },
};
</script>

<style scoped>
.form-container {
  max-width: 480px;
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

.form-group {
  margin-bottom: 1.3rem;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.form-control {
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

.botoes-form {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-submit {
  flex: 1;
  background-color: #3b82f6;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #2563eb;
}

.btn-cancelar {
  background-color: #6b7280;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-cancelar:hover {
  background-color: #4b5563;
}
</style>
