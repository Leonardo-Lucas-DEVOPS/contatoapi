<template>
  <div class="menu">
    <h1>Cadastrar Novos Comentarios</h1>
    <!-- <Comentario /> -->
    <TestApi/>
  </div>
</template>

<script>
// import Comentario from '@/comentarios/comentario.vue';
import TestApi from './comentarios/TestApi.vue';

export default {
  name: 'App',
  components: {
    // Comentario,
    TestApi,
  }
};
</script>
<style>
.menu{
  text-align: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  font-family: sans-serif;
}
</style>
<style></style>
