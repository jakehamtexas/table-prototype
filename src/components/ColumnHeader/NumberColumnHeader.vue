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
import { numberFilters } from "../../filters";
import { plainSorts } from "../../sorts";
export default {
  name: "NumberColumnHeader",
  mixins: [ColumnHeaderMixin],
  created() {
    this.localSorts = plainSorts;
    this.localFilters = numberFilters;
  }
};
</script>