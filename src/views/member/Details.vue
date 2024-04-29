<template>
    <div className="card">
        <h1>Member Details
        </h1>
        <ul>
            <li v-for="invoice in invoices" :key="invoice.id">
                {{ invoice.number }} - {{ invoice.amount }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            invoices: [
                { id: 1, number: 'INV001', amount: 100 },
                { id: 2, number: 'INV002', amount: 200 },
                { id: 3, number: 'INV003', amount: 300 },
            ],
        };
    },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>