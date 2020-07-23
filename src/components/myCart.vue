<template>
  <div>
    <table>
      <th>全选</th>
      <th>商品</th>

      <th>价格</th>
      <th>数量</th>
      <th>小计</th>
      <th>操作</th>

      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>
            <input type="checkbox" name id ref="a" />
          </td>
          <td>
            <img :src="require('@/assets/img/' + item.productImage)" alt />
          </td>
          <td>{{ item.salePrice }}</td>
          <td>
            <button @click="jia(index)">+</button>
            <span>{{ item.num }}</span>
            <button @click="jian(index)">-</button>
          </td>
          <td>{{ item.salePrice * item.num }}</td>
          <td @click="dele(index)">删除</td>
        </tr>
        <tr>
          <td>
            全选
            <input type="checkbox" name id ref="all" @change="qh" />
          </td>
        </tr>
      </tbody>
    </table>
    <p>总价{{ zj }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.params.add);
    if (this.$route.params.add) {
      this.$store.commit("add", this.$route.params.add);
    }
  },

  computed: {
    list() {
      return this.$store.state.list;
    },
    zj() {
      var sum = 0;
      this.list.forEach(n => {
        sum += n.num * n.salePrice;
      });
      return sum;
    }
  },
  methods: {
    dele(n) {
      this.$store.commit("delete", n);
    },
    jia(n) {
      this.$store.commit("jia", n);
    },
    jian(n) {
      this.$store.commit("jian", n);
    },
    // 全选开始
    qh(e) {
      this.$refs.a.map(n => {
        n.checked = e.target.checked;
      });
    }
  }
};
</script>

<style scoped>
table {
  width: 800px;
}
img {
  width: 50px;
  height: 50px;
}
td {
  text-align: center;
}
</style>