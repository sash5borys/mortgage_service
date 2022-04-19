<template>
  <h2>Banks</h2>
  <section class="bank-list">
    <ul >
      <li v-for="bank in banksList" :key="bank.id">
        <a class="bank-list__link" @click="selectedBank = bank">{{bank.name}}</a>
      </li>
    </ul>
  </section>
  <Calculator v-if="selectedBank" :selectedBank="selectedBank"/>
</template>

<script>
import {sender} from './../api.js';
import Calculator from "@/components/Calculator";

export default {
  name: "Banks",
  components: {
    Calculator,
  },
  data() {
    return {
      selectedBank: null,
      banksList: [],
    }
  },
    async created(){
     const data = await sender('http://127.0.0.1:8000/bank/read/0');
     this.banksList = data;
  }
};
</script>

<style scoped>
</style>
