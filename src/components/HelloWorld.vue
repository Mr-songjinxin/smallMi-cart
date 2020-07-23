<template>
  <div class="hello">
    <div class="mhrbox">
      <Head />
    </div>

    <div class="mhrtab">
      <Left />
      <Dispatch />
    </div>
  </div>
</template>

<script>
import Head from "./Head";
import Left from "./Left";
import Dispatch from "./Dispatch";
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  components: {
    Head,
    Left,
    Dispatch
  },
  computed: {}
};
</script>

<style lang='scss' scoped>
.mhrbox {
  width: 800px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background: palegreen;
}

.mhrtab {
  display: flex;
  width: 800px;
}
</style>
