<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import RestService from '@/service/RestDataService';  
import { ref, onBeforeMount } from 'vue';

const customer1 = ref(null);
const customer2 = ref(null);
const customer3 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);
const idFrozen = ref(false);
const products = ref(null);
const deals = ref(null);
const expandedRows = ref([]);
const expandedRowGroups = ref();
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);

const customerService = new CustomerService();
const productService = new ProductService();
const restService = new RestService();


onBeforeMount(() => {
    restService.getData("central", "Franchise", "Deal?filter=vendor-no = vendor-no and item-no = item-no and branch-no = 0 and prc-grp = 0 and start-date <= today and end-date > today").then((res) => {
            deals.value = res.dspurVendprc.ttpurVendprc;
            loading1.value = false;
        });
    //restService.getData().then((data) => (products.value = data));
    customerService.getCustomersLarge().then((data) => {
        customer1.value = data;
        loading1.value = false;
        customer1.value.forEach((customer) => (customer.date = new Date(customer.date)));
    });
    customerService.getCustomersLarge().then((data) => (customer2.value = data));
    customerService.getCustomersMedium().then((data) => (customer3.value = data));
    loading2.value = false;

    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: [0, 50], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

const clearFilter1 = () => {
    initFilters1();
};
const expandAll = () => {
    expandedRows.value = products.value.filter((p) => p.id);
};
const collapseAll = () => {
    expandedRows.value = null;
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'NAD' });
};

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const calculateDealsTotal = (vendorNo) => {
    let total = 0;
    if (deals.value) {
        for (let deal of deals.value) {
            if (deals.value.vendorNo === vendorNo) {
                total++;
            }
        }
    }

    return total;
};
</script>
<template>
    <div className="card">
        <div class="col-12">
            <div class="card">
                <h5>Deals by Vendor</h5>

                <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="deals" tableStyle="min-width: 50rem"
                    expandableRowGroups rowGroupMode="subheader" groupRowsBy="vendorNo" @rowgroup-expand="onRowGroupExpand" @rowgroup-collapse="onRowGroupCollapse"
                    sortMode="single" sortField="vendorNo" :sortOrder="1">
                    <template #groupheader="slotProps">
                        <!--<img :alt="vendorNo" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.data.representative.image}`" width="32" style="vertical-align: middle" class="ml-2" />-->
                        <span class="vertical-align-middle ml-2 font-bold line-height-3">Vendor ID: {{ slotProps.data.vendorNo }}</span>
                    </template>
                    <Column field="vendorNo" header="Vendor"></Column>
                    <!--<Column field="name" header="Name" style="width: 20%"></Column>
                    <Column field="country" header="Country" style="width: 20%">
                        <template #body="slotProps">
                            <div class="flex align-items-center gap-2">
                                <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.data.country.code}`" style="width: 24px" />
                                <span>{{ slotProps.data.country.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="company" header="Company" style="width: 20%"></Column>
                    <Column field="status" header="Status" style="width: 20%">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                        </template>
                    </Column>
                    <Column field="date" header="Date" style="width: 20%"></Column>
                    <template #groupfooter="slotProps">
                        <div class="flex justify-content-end font-bold w-full">Total Customers: {{ calculateCustomerTotal(slotProps.data.representative.name) }}</div>
                    </template>
                </DataTable>-->





                <!--<DataTable :value="deals" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" rowGroupMode="subheader" groupRowsBy="vendorNo" sortMode="single" sortField="vendorNo" :sortOrder="1" scrollable scrollHeight="400px">
                    <Column expander style="width: 5rem" />
                    <Column field="vendorNo" header="Vendor Number"></Column>-->
                    <Column field="itemNo" header="Item No" style="min-width: 100px"></Column>
                    <Column field="itemDesc" header="Description" style="min-width: 200px"></Column>
                    <Column field="contrNo" header="Deal No" style="min-width: 150px"></Column>
                    <Column field="purcUom" header="Purchase UOM" style="min-width: 50px"></Column>
                    <Column field="purcUomConv" header="UOM Conv" style="min-width: 50px"></Column>
                    <Column field="startDate" header="Start Date" style="min-width: 100px"></Column>
                    <Column field="endDate" header="End Date" style="min-width: 100px"></Column>
                    <Column field="discPerc" header="Discount %" style="min-width: 50px"></Column>
                    <Column field="discAmt" header="Discount Amount" style="min-width: 50px"></Column>
                    <Column field="listPrc" header="List Price" style="min-width: 50px"></Column>
                    <Column field="netPrc" header="Net Price" style="min-width: 50px">
                        <template #body="slotProps">
                            {{ calculateDiscountedPrice(slotProps.data.listPrc, slotProps.data.discPerc) }}
                        </template>
                    </Column>
                    
                    <!--<Column field="country" header="Country" style="min-width: 200px">
                        <template #body="slotProps">
                            <img src="/demo/images/flag/flag_placeholder.png" :class="'flag flag-' + slotProps.data" width="30" />
                            <span class="image-text ml-2">{{ slotProps.data }}</span>
                        </template>
                    </Column>
                    <Column field="company" header="Company" style="min-width: 200px"></Column>
                    <Column field="status" header="Status" style="min-width: 200px">
                        <template #body="slotProps">
                            <span :class="'customer-badge status-' + slotProps.data">{{ slotProps.data }}</span>
                        </template>
                    </Column>
                    <Column field="date" header="Date" style="min-width: 200px"></Column>
                    <template #groupheader="slotProps">
                        <img :alt="slotProps.data.vendorNo" :src="'demo/images/avatar/' + slotProps.data.vendorNo" width="32" style="vertical-align: middle" />
                        <span class="image-text font-bold ml-2">Vendor ID: {{ slotProps.data.vendorNo }}</span>
                    </template>
                    <template #groupfooter="slotProps">
                        <td style="text-align: right" class="text-bold pr-6">Total Deals: {{ calculateDealsTotal(vendorNo) }}</td>
                    </template>-->
                </DataTable> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // ...
  methods: {
    calculateDiscountedPrice(rowData) {
      if (rowData.discAmt !== 0) {
        return rowData.listPrc - rowData.discAmt;
      } else if (rowData.discPerc !== 0) {
        return rowData.listPrc - (rowData.listPrc * rowData.discPerc / 100);
      } else {
        return rowData.listPrc;
      }
    },
  },
  // ...
    data() {
        return {
            items: [
                { id: 1, column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
                { id: 2, column1: 'Value 4', column2: 'Value 5', column3: 'Value 6' },
                { id: 3, column1: 'Value 7', column2: 'Value 8', column3: 'Value 9' },
                // Add more items as needed
            ]
        };
    }
};
</script>

<style scoped>
/* Add custom styles for the table if needed */
</style>