<template>
  <th>
    <span>{{columnHeader}}</span>
    <select v-model="selectedFilterFunc">
      <option
        v-for="filter in filters"
        :key="JSON.stringify(filter)"
        :value="filter.func"
      >{{filter.display}}</option>
    </select>
    <input type="text" v-model="filterText" />
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
    }
  },
  methods: {
    sortAscending() {
      const ascendingSort = this.sorts.find(
        sort => sort.sortId === "ascending"
      );
      const sortFunc = ascendingSort.sortFunc;
      this.$emit("sort", this.propertyName, sortFunc);
    },
    sortDescending() {
      const descendingSort = this.sorts.find(
        sort => sort.sortId === "descending"
      );
      const sortFunc = descendingSort.sortFunc;
      this.$emit("sort", this.propertyName, sortFunc);
    }
  },
  watch: {
    selectedFilterFunc(val) {
      this.$emit("filter", this.propertyName, val);
    }
  }
};
</script>