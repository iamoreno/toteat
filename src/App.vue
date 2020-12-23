<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/graphs">Gráficos Generales</router-link> |
      <router-link to="/hourly">Información Horaria</router-link> |
      <router-link to="/products">Productos</router-link> |
      <router-link to="/waiters">Meseros</router-link> |
      <router-link to="/cashiers">Cajeros</router-link> |
      <router-link to="/zones">Zonas</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
