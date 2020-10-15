<template>
  <div class="container">
    <h1 class="title">
      task-gantt
    </h1>
    <div>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Tableau" active>
            <b-card-text>
              <div>
                <b-table striped hover :items="items"></b-table>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Gantt">
            <b-card-text>Tab contents 2</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      items: []
    };
  },
  async fetch() {
    this.items = await fetch("/data.json").then(res =>
      res.json()
    );
  }
});
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container > * {
  flex-basis: 100%;
  margin: 20px auto;
}

.title {
  display: block;
  flex-basis: 100%;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
