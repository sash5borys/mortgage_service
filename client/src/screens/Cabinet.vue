<template>
  <section class="payments-list">
    <table>
      <tr>
        <th>Bank</th>
        <th>Amount</th>
        <th>Term(times)</th>
        <th>Paid(times)</th>
        <th>Pay</th>
      </tr>
      <tr v-for="payment in paymentsList" :key="payment.id">
        <td>{{ payment.bankId }}</td>
        <td>{{ payment.amount }}</td>
        <td>{{ payment.term }}</td>
        <td>{{ payment.times }}</td>
        <td>
          <button
            @click="payNextLoan(payment)"
            :disabled="payment.term == payment.times"
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
      paymentsList: [],
    };
  },
  async created() {
    const data = await sender("http://127.0.0.1:8000/payment/read/0");
    this.paymentsList = data;
  },
  methods: {
    async payNextLoan({ ...curPayment }) {
      const nextPayment = await sender(
        "http://127.0.0.1:8000/payment/create",
        "POST",
        {
          userId: 1,
          bankId: curPayment.bankId,
          amount: curPayment.monthlyAmount,
          monthlyAmount: curPayment.monthlyAmount,
          totalAmount: curPayment.totalAmount,
          term: curPayment.term,
          times: curPayment.times + 1,
          date: new Date().toLocaleString(),
        }
      );
      this.paymentsList.push(nextPayment);
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
