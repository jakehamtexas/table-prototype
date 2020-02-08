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
import { feetFilters } from "../../filters";
import { feetSorts } from "../../sorts";
export default {
  name: "FeetColumnHeader",
  mixins: [ColumnHeaderMixin],
  created() {
    this.localSorts = feetSorts;
    this.localFilters = feetFilters;
  }
};
</script>