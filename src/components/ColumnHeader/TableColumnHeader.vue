<template>
  <th>
    <slot></slot>
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
import { ColumnHeaderMixin } from "./ColumnHeaderMixin";
const matchesFilterObjectSchema = filter => filter; //stub
const matchesSortObjectSchema = sort => sort; //stub
export default {
  name: "TableColumnHeader",
  mixins: [ColumnHeaderMixin],
  props: {
    filters: {
      type: Array,
      validator: filters => filters.every(matchesFilterObjectSchema)
    },
    sorts: {
      type: Array,
      validator: sorts => sorts.every(matchesSortObjectSchema)
    }
  },
  created() {
    this.localFilters = this.filters;
    this.localSorts = this.sorts;
  }
};
</script>