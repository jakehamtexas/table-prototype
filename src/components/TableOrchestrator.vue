<template>
  <div>
    <TableSearch :keys="searchKeys" @included-keys-changed="addKeysToFilters" />
    <TablePaginator
      :number-per-page.sync="pagination"
      :selected-page.sync="currentPage"
      :items-count="resolvedTableData.length"
    />
    <table>
      <thead>
        <TableColumnHeader
          :property-name="'a'"
          :filters="numberFilters"
          :sorts="numberSorts"
          :column-header="'Aaaaaa'"
          @sort="applySort"
          @filter="upsertFilter"
        />
        <TableColumnHeader
          :property-name="'b'"
          :filters="feetFilters"
          :sorts="feetSorts"
          :column-header="'BBBBBB'"
          @sort="applySort"
          @filter="upsertFilter"
        />
        <TableColumnHeader
          :property-name="'c'"
          :column-header="'Ccccc'"
          :filters="textFilters"
          :sorts="textSorts"
          @sort="applySort"
          @filter="upsertFilter"
        />
      </thead>
      <tbody>
        <tr v-for="data of scrollableTableData" :key="data.searchKey">
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
import { feetFilters, numberFilters, textFilters } from "../filters";
import { feetSorts, plainSorts } from "../sorts";
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
    pagination: 5,
    currentPage: 0,

    numberFilters,
    feetFilters,
    textFilters,

    numberSorts: plainSorts,
    feetSorts,
    textSorts: plainSorts
  }),
  created() {
    this.tableData = testData;
  },
  computed: {
    tableDataWithSearchKeys() {
      return this.tableData.map(datum => {
        const searchKey = Object.values(datum)
          .map(value => `${value}`.toLowerCase())
          .join("");
        return { ...datum, searchKey };
      });
    },
    searchKeys() {
      return this.tableDataWithSearchKeys.map(data => data.searchKey);
    },
    resolvedTableData() {
      const tableDataWithSearchKeys = this.tableDataWithSearchKeys;
      const filteredTableData = this.filters
        .map(filter =>
          filter.filterText
            ? filter.filterFunc(filter.filterText)
            : filter.filterFunc
        )
        .reduce(
          (filteredTableData, filterFunc) =>
            filteredTableData.filter(filterFunc),
          [...tableDataWithSearchKeys]
        );

      const sortedTableData = this.sorts.reduce(
        (sortedTableData, sortFunc) => sortedTableData.sort(sortFunc),
        [...filteredTableData]
      );
      return sortedTableData;
    },
    scrollableTableData() {
      const start = this.currentPage * this.pagination;
      const endOfNextPage = (this.currentPage + 1) * this.pagination;
      return this.resolvedTableData.slice(start, endOfNextPage);
    }
  },
  methods: {
    addKeysToFilters(keys) {
      const filterId = "tableSearchKeys";
      const tableSearchKeyFilterIndex = this.filters.findIndex(
        filter => filter.filterId === filterId
      );
      const tableSearchKeyFilterFunction = tableDataItem =>
        keys.some(key => tableDataItem.searchKey === key);
      this.filters.splice(tableSearchKeyFilterIndex, 1, {
        filterId,
        filterFunc: tableSearchKeyFilterFunction
      });
    },
    applySort(propertyName, sortFunc) {
      this.sorts = [sortFunc(propertyName)]; //doesn't support more than one sort at a time
    },
    upsertFilter(filterPayload) {
      const filterIndex = this.filters.findIndex(
        filter => filter.filterId === filterPayload.filterId
      );
      if (filterIndex !== -1) {
        this.filters.splice(filterIndex, 1, filterPayload);
      } else {
        this.filters.push(filterPayload);
      }
    }
  }
};
</script>