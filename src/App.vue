<template>
  <div id="app">
    <TableOrchestrator />
  </div>
</template>

<script>
import TableOrchestrator from "./components/TableOrchestrator";

export default {
  name: "App",
  components: {
    TableOrchestrator
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
