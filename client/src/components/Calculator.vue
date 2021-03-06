<template>
  <h2>Calculator</h2>
  <section id="calculator" class="calculator">
    <article class="calculator__control">
      <div class="calculator__control__top">
        <p class="calculator__control__title">Loan amount, UAH</p>
        <div class="calculator__control__sum">
          <input type="text" v-model="amountBorrowed" />
        </div>
      </div>
      <div class="calculator__controll__range">
        <input
          class="calculator__controll__range-input"
          type="range"
          step="1"
          min="0"
          :max="curBank.maximumLoan"
          v-model="amountBorrowed"
        />
        <div class="calculator__controll__range-minmax">
          <span>0</span>
          <span>{{ curBank.maximumLoan }}</span>
        </div>
      </div>
      <div class="calculator__control__bottom">
        <button class="calculator__control__button" @click="takeLoan()">
          Take a loan
        </button>
      </div>
    </article>
    <article class="calculator__info">
      <div class="calculator__info__monthly-payment">
        <p class="calculator__info__title">Loan amount</p>
        <span class="calculator__info__sum">{{ amountBorrowed }} UAH</span>
      </div>
      <div class="calculator__info__main-info">
        <div class="calculator__info__cell-info">
          <p class="calculator__info__title">First installment</p>
          <span class="calculator__info__sum">{{ downPayment }}</span>
        </div>
        <div class="calculator__info__cell-info">
          <p class="calculator__info__title">Monthly payment</p>
          <span class="calculator__info__sum">{{ monthlyPayment }}</span>
        </div>
      </div>
      <div class="calculator__info__cell-info">
        <p class="calculator__info__title">The total loan cost</p>
        <span class="calculator__info__sum">{{ totalPayment }}</span>
      </div>
      <div class="calculator__info__cell-info">
        <p class="calculator__info__title">Real annual interest rate, %</p>
        <span class="calculator__info__sum">{{ curBank.term }}</span>
      </div>
    </article>
  </section>
</template>

<script>
import { sender } from "./../api.js";

export default {
  name: "Calculator",
  props: {
    selectedBank: Object,
  },
  data() {
    return {
      amountBorrowed: 0,
      curBank: this.selectedBank
    };
  },
  computed: {
    downPayment() {
      return ((this.amountBorrowed / 100) * this.curBank.minimumAvance).toFixed(2);
    },
    loanPayment() {
      return this.amountBorrowed - this.downPayment;
    },
    interestProccent() {
      return this.curBank.interestRate / 100;
    },
    monthlyRate() {
      return this.interestProccent / 12;
    },
    monthlyPayment() {
      return (
        (this.loanPayment *
          this.monthlyRate *
          Math.pow(1 + this.monthlyRate, this.curBank.term)) /
        (Math.pow(1 + this.monthlyRate, this.curBank.term) - 1)
      ).toFixed(2);
    },
    totalPayment() {
      this.monthlyPayment * this.curBank.term;
    },
  },
  methods: {
    async takeLoan() {
      console.log();
      await sender("/payment/create", "POST", {
        userId: 1,
        bankId: this.curBank.id,
        amount: this.downPayment,
        monthlyAmount: this.monthlyPayment,
        count: 1,
        date: new Date().toLocaleString(),
      });
    },
  },
  watch: {
    selectedBank(newBank) {
      this.curBank = newBank;
    },
  },
};
</script>

<style scoped>
#calculator {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 50px;
}

.calculator__control {
  display: block;
}
.calculator__control__top,
.calculator__controll__range-minmax {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.calculator__control__sum > input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.calculator__control__sum > input:hover {
  background-color: rgb(236, 236, 236);
}
.calculator__control__bottom {
  display: flex;
  justify-content: center;
}
.calculator__controll__range-input {
  width: 100%;
}

@media (min-width: 640px) {
  #calculator {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
