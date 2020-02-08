<template>
  <div>
    <TableSearch :keys="searchKeys" @included-keys-changed="addKeysToFilters" />
    <TablePaginator
      :number-per-page.sync="pagination"
      :selected-page.sync="pageNumber"
      :items-count="resolvedTableData.length"
    />
    <table>
      <thead>
        <TableColumnHeader
          :property-name="'a'"
          :filters="numberFilters"
          :sorts="numberSorts"
          @sort="applySort"
          @filter="upsertFilter"
        />
        <TableColumnHeader
          :property-name="'b'"
          :filters="feetFilters"
          :sorts="feetSorts"
          @sort="applySort"
          @filter="upsertFilter"
        />
        <TableColumnHeader
          :property-name="'c'"
          :filters="textFilters"
          :sorts="textSorts"
          @sort="applySort"
          @filter="upsertFilter"
        />
      </thead>
      <tbody>
        <tr v-for="data of scrollableTableData" :key="getKey(data)">
          <td>{{data.a}}</td>
          <td>{{data.b}}</td>
          <td>{{data.c}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TableSearch from "./TableSearch";
import TablePaginator from "./TablePaginator";
import TableColumnHeader from "./TableColumnHeader";
import { testData } from "../testData";
export default {
  name: "TableOrchestrator",
  components: {
    TableSearch,
    TablePaginator,
    TableColumnHeader
  },
  data: () => ({
    tableData: [],
    filters: [],
    sorts: [],
    pagination: 0,
    currentPage: 0
  }),
  created() {
    this.tableData = testData;
  },
  computed: {
    tableDataBySearchKey() {
      return this.tableData.map(datum => {
        const searchKey = Object.values(datum)
          .map(value => `${value}`.toLowerCase())
          .join("");
        return {
          [searchKey]: datum
        };
      });
    },
    searchKeys() {
      return Object.keys(this.tableDataBySearchKey);
    },
    resolvedTableData() {
      const tableDataBySearchKey = this.tableDataBySearchKey;
      const filteredTableData = this.filters.reduce(
        (filteredTableData, filterFunc) =>
          filteredTableData.filter(filterFunc()),
        [...tableDataBySearchKey]
      );
      const sortedTableData = this.sorts.reduce(
        (sortedTableData, sortFunc) => sortedTableData.sort(sortFunc),
        [...filteredTableData]
      );
      return sortedTableData;
    },
    scrollableTableData() {
      const start = this.currentPage * this.pagination;
      return this.resolvedTableData.slice(start, this.pagination);
    }
  },
  methods: {
    addKeysToFilters(keys) {
      const filterId = "tableSearchKeys";
      const tableSearchKeyFilterIndex = this.filters.indexOf(
        filter => filter.filterId === filterId
      );
      const tableSearchKeyFilterFunction = tableDataItem =>
        keys.some(key => tableDataItem[key]);
      this.filters.splice(tableSearchKeyFilterIndex, 1, {
        filterId,
        filterFunc: tableSearchKeyFilterFunction
      });
    },
    applySort(propertyName, sortFunc) {
      this.sorts = [sortFunc]; //doesn't support more than one sort at a time
    },
    upsertFilter(propertyName, filterFunc) {
      const filterId = propertyName;
      const filterIndex = this.filters.indexOf(
        filter => filter.filterId === filterId
      );

      if (filterIndex !== -1) {
        this.filters.splice(filterIndex, 1, {
          filterId,
          filterFunc
        });
      } else {
        this.filters.push({
          filterId,
          filterFunc
        });
      }
    },
    getTemplateKey(data) {
      return Object.keys(data)[0];
    }
  }
};
</script>