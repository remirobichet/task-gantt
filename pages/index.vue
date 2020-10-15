<template>
  <div class="container">
    <h1>
      task-gantt
    </h1>
    <!-- Raw object for debugging -->
    <!-- {{ items }} -->
    <div>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Tableau" active>
            <b-card-text>
              <div>
                <b-table striped hover :items="items" :fields="fields">
                  <!-- using moment to format datetime to human readable date -->
                  <template v-slot:cell(_start)="data">
                    {{ data.item._start | moment("DD/MM/YYYY") }}
                  </template>
                  <template v-slot:cell(_end)="data">
                    {{ data.item._end | moment("DD/MM/YYYY") }}
                  </template>
                  <template v-slot:cell(progress)="data">
                    {{ data.item.progress }}%
                  </template>
                </b-table>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Gantt">
            <b-card-text>
              <svg id="gantt"></svg>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Gantt from "frappe-gantt";
import moment from "moment";

Vue.use(require("vue-moment"));

let gantt;
let items: any[] = [];

export default Vue.extend({
  data() {
    return {
      items: items,
      // using _start and _end instead of start and end because these are the updated values
      fields: ["name", "_start", "_end", "progress"]
    };
  },
  async fetch() {
    // fetching /static/data.json file
    this.items = await fetch("/data.json").then(res => res.json());
    gantt = new Gantt("#gantt", this.items, {
      bar_height: 20,
      bar_corner_radius: 3,
      arrow_curve: 5,
      padding: 30,
      view_mode: "Day",
      date_format: "DD-MM-YYYY",
      on_date_change: (task: any, start: any, end: any) => {
        //debugger

        // Ici on recoit bien les nouvelles données mais dans le cycle du debugger
        // il y a une étape en moins (*) qui je pense est la raison du non-rafraichissement des données
      },
      on_progress_change: (task: any, progress: any) => {
        //debugger 

        // (*) étape en plus présente dans ce debugger
      }
    });
    gantt.change_view_mode("Week");
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
  max-width: 100%;
  flex-basis: 100%;
  margin: 20px auto;
}

h1 {
  display: block;
  flex-basis: 100%;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
