<template>
  <div class="v-footer">
    <img src="../../../assets/img/footer.png" alt="" />
    <div class="container">
      <run-time></run-time>
    </div>
  </div>
</template>

<script>
import runTime from "../../runTime.vue";
export default {
  components: {
    runTime,
  },
};
</script>

<style scoped>
.v-footer {
  width: 100%;
  color: #888;
  font-size: 12px;
  position: relative;
  margin-top: 40px;
  /* padding: 15px 0 10px; */
  background-color: rgb(46, 47, 47);
  text-align: center;
}
.v-footer img {
  width: 100%;
}
</style>