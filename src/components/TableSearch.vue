<template>
  <input type="text" v-model="searchText" />
</template>

<script>
export default {
  name: "TableSearch",
  props: {
    keys: {
      type: Array,
      required: true,
      validator: keys => keys.every(key => typeof key === "string")
    }
  },
  data: () => ({
    searchText: ""
  }),
  computed: {
    includedKeys() {
      const searchText = this.searchText.toLowerCase().trim();
      return this.keys
        .map(key => key.toLowerCase())
        .filter(key => key.includes(searchText));
    }
  },
  watch: {
    includedKeys() {
      this.$emit("included-keys-changed", this.includedKeys);
    }
  }
};
</script>