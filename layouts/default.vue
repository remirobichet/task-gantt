<template>
  <div>
    <h1>
      task-gantt
    </h1>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/about">About</nuxt-link>
    </nav>
    <hr />
    <Nuxt />
  </div>
</template>

<style>
h1 {
  display: block;
  text-align: center;
  flex-basis: 100%;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

nav > * {
  margin: 20px;
}
</style>
