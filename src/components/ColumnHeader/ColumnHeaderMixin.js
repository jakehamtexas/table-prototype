const ColumnHeaderMixin = {
  data: () => ({
    filterText: "",
    selectedFilterFunc: null,
    localFilters: [],
    localSorts: []
  }),
  props: {
    propertyName: String
  },
  computed: {
    unwrappedFilters() {
      return this.localFilters.map(getFunc => getFunc(this.propertyName));
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
      const ascendingSort = this.localSorts.find(
        sort => sort.direction === "ascending"
      );
      const sortFunc = ascendingSort.func;
      this.$emit("sort", this.propertyName, sortFunc);
    },
    sortDescending() {
      const descendingSort = this.localSorts.find(
        sort => sort.direction === "descending"
      );
      const sortFunc = descendingSort.func;
      this.$emit("sort", this.propertyName, sortFunc);
    }
  }
};

export { ColumnHeaderMixin };
