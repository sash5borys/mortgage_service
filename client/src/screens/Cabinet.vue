<template>
  <section class="payments-list">
    <table>
      <tr>
        <th>Bank</th>
        <th>Amount</th>
        <th>Term(times)</th>
        <th>Pay</th>
      </tr>
      <tr v-for="payment in paymentsList" :key="payment.id">
        <td>{{ payment.bankName }}</td>
        <td>{{ payment.amount }}</td>
        <td>{{ payment.count }}</td>
        <td>
          <button
            :class="{ 'active': payment.amount < 1 || payment.term == payment.times }"
            @click="payNextLoan(payment)"
            :disabled="payment.amount < 1 || payment.term == payment.times"
          >
            Pay next
          </button>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import { sender } from "./../api.js";

export default {
  name: "Cabinet",
  data() {
    return {
      banksList: [],
      paymentsList: [],
    };
  },
  async created() {
    this.banksList = await sender("/bank/read/0");
    const paymentsData = await sender("/payment/read/0");
    this.paymentsList = this.supplementPayment(paymentsData, this.banksList);
  },
  methods: {
    supplementPayment(paymentsData, banksData){
      return paymentsData.map(payment => {
        const curBank = banksData.find(bank => bank.id == payment.bankId);
        return {
          ...payment,
          bankName: curBank.name,
          term: curBank.term
        }; 
      });
    },
    async payNextLoan(curPayment) {
      const nextPayment = await sender(
        "/payment/create",
        "POST",
        {
          userId: 1,
          bankId: curPayment.bankId,
          amount: curPayment.monthlyAmount,
          monthlyAmount: curPayment.monthlyAmount,
          count: curPayment.count + 1,
          date: new Date().toLocaleString(),
        }
      );
      this.paymentsList.push(nextPayment)
      this.paymentsList = this.supplementPayment(this.paymentsList, this.banksList)
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th,
td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #e2e2e2;
}
</style>
