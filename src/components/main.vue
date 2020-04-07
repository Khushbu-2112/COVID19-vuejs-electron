<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <h2>COVID-19 Worldwide Result</h2>
      </div>
    </div>
    <div class="row" v-if="load">
      <div class="col-md-4">
        <Card :cases="worldWideResult.confirmed.value" title="Confirmed Cases" />
      </div>
      <div class="col-md-4" v-if="countryList">
        <Card :cases="worldWideResult.recovered.value" title="Recovered Cases" />
      </div>
      <div class="col-md-4">
        <Card :cases="worldWideResult.deaths.value" title="Total Deaths" />
      </div>
    </div>
    <div class="row bg-light mt-5">
      <div class="col-md-12">
        <div class="form-group">
          <label>Filter By Country :</label>
          <select class="custom-select mb-3" v-model="country" v-on:change="countryFilter()">
            <option v-for="(c,i) in countries" v-bind:key="i" :value="c.iso3">{{c.name}}</option>
          </select>
        </div>
        <canvas id="myChart" width="400" height="auto" v-show="country"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Card from "./card";
import APIService from "../api.service";

export default {
  name: "Main",
  components: {
    Card
  },
  created() {
    this.$store.dispatch("getCountryList").then(res => {
      this.$store.commit("setCountryList", res.data.countries);
      this.countryList = true;
    });
  },
  mounted() {
    this.createChart();
    this.$store.dispatch("getWorldWideData");
  },
  data: function() {
    return {
      countryList: false,
      country: "",
      ctx: null,
      myChart: null
    };
  },
  computed: {
    worldWideResult() {
      return this.$store.state.worldWideResult;
    },
    load() {
      return this.$store.state.loading;
    },
    countries() {
      return this.$store.state.countyList;
    }
  },
  methods: {
    countryFilter() {
      APIService.getCountryResults(this.country).then(res => {
        let arr = [];
        arr.push(res.data.confirmed.value);
        arr.push(res.data.recovered.value);
        arr.push(res.data.deaths.value);
        this.updateChart(arr);
      });
    },
    updateChart(data) {
      this.myChart.data.datasets[0].data = data;
      this.myChart.update();
    },
    createChart() {
      this.ctx = document.getElementById("myChart").getContext("2d");
      this.myChart = new Chart(this.ctx, {
        type: "bar",
        data: {
          labels: ["Confirmed Cases", "Recovered Cases", "Total Deaths"],
          datasets: [
            {
              label: "# of Cases",
              data: [0, 0, 0],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(255, 99, 132, 0.2)"
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
