<template>
  <div class="app-container">
    <el-button icon="el-icon-question"
               type="primary"
               @click.prevent.stop="guide">打开引导</el-button>
  </div>
</template>

<script lang="ts">
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { Component, Vue } from 'vue-property-decorator';
import steps from './steps';
@Component({
  name: 'Guide'
})
export default class extends Vue {
  private driver: Driver | null = null;

  mounted() {
    this.driver = new Driver({
      allowClose: true, // 禁止点击外部关闭
      doneBtnText: '完成',
      closeBtnText: '关闭',
      stageBackground: '#fff', // 引导对话的背景色
      nextBtnText: '下一步',
      prevBtnText: '上一步'
    });
  }

  private guide() {
    if (this.driver) {
      this.driver.defineSteps(steps);
      this.driver.start();
    }
  }
}
</script>