<template>
  <th>
    <span>{{columnHeader}}</span>
    <select v-model="selectedFilterFunc">
      <option
        v-for="filter in unwrappedFilters"
        :key="JSON.stringify(filter)"
        :value="filter.func"
      >{{filter.display}}</option>
    </select>
    <input type="text" v-model="filterText" />
    <button @click="$emit('filter', filterPayload)">FILTER</button>
    <span @click="sortAscending">Sort Ascending</span>
    <span @click="sortDescending">Sort Descending</span>
  </th>
</template>
<script>
const matchesFilterObjectSchema = filter => filter; //stub
const matchesSortObjectSchema = sort => sort; //stub
export default {
  name: "TableColumnHeader",
  data: () => ({
    filterText: "",
    selectedFilterFunc: null
  }),
  props: {
    propertyName: String,
    filters: {
      type: Array,
      validator: filters => filters.every(matchesFilterObjectSchema)
    },
    sorts: {
      type: Array,
      validator: sorts => sorts.every(matchesSortObjectSchema)
    },
    columnHeader: String
  },
  computed: {
    unwrappedFilters() {
      return this.filters.map(getFunc => getFunc(this.propertyName));
    },
    filterPayload() {
      return {
        filterFunc: this.selectedFilterFunc,
        filterId: this.propertyName,
        filterText: this.filterText
      };
    }
  },
  methods: {
    sortAscending() {
      const ascendingSort = this.sorts.find(
        sort => sort.direction === "ascending"
      );
      const sortFunc = ascendingSort.func;
      this.$emit("sort", this.propertyName, sortFunc);
    },
    sortDescending() {
      const descendingSort = this.sorts.find(
        sort => sort.direction === "descending"
      );
      const sortFunc = descendingSort.func;
      this.$emit("sort", this.propertyName, sortFunc);
    }
  }
};
</script>