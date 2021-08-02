<template>
  <div class="container">
    <el-form ref="articleForm"
             :model="articleForm"
             label-width="120px"
             :rules="rules">
      <el-form-item label="author"
                    prop="author"
                    width="200">
        <el-input v-model="articleForm.author"
                  placeholder="Please input author"></el-input>
      </el-form-item>
      <el-form-item label="title："
                    prop="title"
                    width="200">
        <el-input v-model="articleForm.title"
                  placeholder="Please input title"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button type="primary"
                 :loading="loading"
                 @click="submitForm">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Form } from 'element-ui';
@Component({
  name: 'ArticleDetail'
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;

  private validateRequire = (rule: any, value: string, callback: Function) => {
    console.log('value', value);
    console.log('rule', rule);
    if (value === '') {
      this.$message({
        message: rule.field + ' is required',
        type: 'error'
      });
      callback(new Error(rule.field + ' is required'));
    } else {
      callback();
    }
  };

  private articleForm = {};
  private loading = false;
  private userListOptions = [];
  private rules = {
    author: [{ validator: this.validateRequire, trigger: 'change' }]
  };

  // get timestamp() {
  //   return +new Date(this.articleForm.timestamp);
  // }

  // set timestamp(value) {
  //   this.articleForm.timestamp = +new Date(value);
  // }

  created() {}

  private submitForm() {
    (this.$refs.articleForm as Form).validate((valid) => {
      console.log('articleForm', this.articleForm);
      if (valid) {
        this.loading = true;
        this.$notify({
          title: 'Success',
          message: 'The post published successfully',
          type: 'success',
          duration: 2000
        });
        // this.articleForm.status = 'published'
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ path: '/table/list' });
        }, 0.5 * 1000);
      } else {
        console.error('Submit Error!');
        return false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>