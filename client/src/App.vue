<template>
  <h1>Mortgage Service</h1>
  <nav>
    <ul class="nav_top">
      <li><a class="nav_top__link" @click="screen = 'cabinet'">Cabinet</a></li>
      <li><a class="nav_top__link" @click="screen = 'banks'">Banks</a></li>
    </ul>
  </nav>
  <div class="container">
    <Cabinet v-if="screen == 'cabinet'" />
    <Banks v-if="screen == 'banks'" />
  </div>
</template>

<script>
import { reactive } from "vue";
import Cabinet from "@/screens/Cabinet";
import Banks from "@/screens/Banks";

export default {
  name: "App",
  components: {
    Cabinet,
    Banks,
  },
  data() {
    return {
      screen: "cabinet",
    };
  },
};
</script>

<style>
body {
  background: #f4f4f4;
  font-family: sans-serif;
}
nav,
section,
article {
  margin-bottom: 32px;
}
h1 {
  text-align: center;
}
ul {
  display: flex;
}
ul > li {
  list-style: none;
}
li,
a,
button {
  margin-right: 10px;
  cursor: pointer;
}
a,
button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
}
a:hover,
button:hover {
  opacity: 0.5;
}
button {
  background-color: #7e7751;
}
.container {
  max-width: 1000px;
  margin: 20px auto 0;
}
</style>
