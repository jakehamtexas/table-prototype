<template>
  <div>
    <select v-model="paginationSelection">
      <option
        v-for="option of paginationOptions"
        :key="option"
        :value="option"
      >{{getOptionDisplay(option)}}</option>
    </select>
    <span v-if="hasPrevious" @click="goPrevious">Previous</span>
    <span v-if="hasNext" @click="goNext">Next</span>
  </div>
</template>

<script>
const options = [5, 10, 25, 50, 100, 200, 500, Infinity]; //https://www.reddit.com/r/vuejs/comments/eqgnap/wanted_to_share_my_first_vue_component_a_virtual/
export default {
  name: "TablePaginator",
  props: {
    numberPerPage: {
      type: Number,
      default: options[4],
      validator: val => options.includes(val)
    },
    selectedPage: {
      type: Number
    },
    itemsCount: {
      type: Number
    }
  },
  methods: {
    getOptionDisplay(option) {
      return option === Infinity ? "Infinity" : option;
    },
    goNext() {
      this.selectedPageLocal++;
    },
    goPrevious() {
      this.selectedPageLocal--;
    }
  },
  data: () => ({
    paginationOptions: [],
    paginationSelection: 0,
    selectedPageLocal: 0
  }),
  created() {
    this.paginationOptions = [...options];
    this.paginationSelection = this.default;
  },
  watch: {
    paginationSelection(val) {
      this.$emit("update:numberPerPage", val);
    },
    selectedPageLocal(val) {
      this.$emit("update:selectedPage", val);
    }
  },
  computed: {
    hasPrevious() {
      return this.selectedPageLocal !== 0;
    },
    hasNext() {
      return (
        this.selectedPageLocal !== this.itemsCount % this.paginationSelection
      );
    }
  }
};
</script>