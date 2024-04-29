<template>
    <div className="card">
        <h1>List of Vendors</h1>
        <ul>
            <li v-for="vendor in vendors" :key="vendor.id" @click="handleVendorClick(vendor)">
                {{ vendor.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            vendors: [
                { id: 1, name: 'Vendor 1' },
                { id: 2, name: 'Vendor 2' },
                { id: 3, name: 'Vendor 3' },
                // Add more vendors here
            ]
        };
    },
    methods: {
        handleVendorClick(vendor) {
            // Handle the click event for the vendor
            console.log('Clicked on vendor:', vendor);
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>