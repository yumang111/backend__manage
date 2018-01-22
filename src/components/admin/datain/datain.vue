<template>
  <div>
    <el-row class="upload-box">
      <el-col :span="3">
        <img class="upload-image" src="../../../assets/image/upload-sign.png" alt="">
      </el-col>
      <el-col :span="15">
        <p>管理员可在此界面中，下载客户导入所需要的excel模板，并根据模板相应填写客户信息。</p>
        <p>填写完成后，可上传excel，并将客户批量导入到亿聚宝中，进入待分配列表</p>
      </el-col>
      <el-col :span="5">
        <a href="javascript:void(0);" class="el-button upload-btn el-button--primary">
          上传文件
          <input @change="upload" ref="uploadFile" name="" id="" class="upload-input" type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        </a>
        <a class="el-button upload-btn distance el-button--primary" href='http://yfdev.oss-cn-hangzhou.aliyuncs.com/avatar/housemarket/excel/%E5%AE%A2%E6%88%B7%E8%B5%84%E6%96%99%E6%A8%A1%E6%9D%BF.xlsx'>
          下载模板
        </a>
      </el-col>
    </el-row>
    <h3 class="upload-tableTit">上传记录列表</h3>
    <div class="upload-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="日期">
          <template scope="scope">
            <div v-html="formatterTime(scope.row.createTime)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="文档名称">
          <template scope="scope">
            <a :href="scope.row.aliyunFullPath" v-html="formatterFileName(scope.row.fileName)"></a>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="大小">
          <template scope="scope">{{scope.row.size}}KB</template>
        </el-table-column>
        <el-table-column prop="rowNumber" label="数据条数"></el-table-column>
        <el-table-column prop="status" label="上传状态">
          <template class="blue" scope="scope">
            <span class="blue" v-if="scope.row.status==1">
              上传成功
            </span>
            <span class="red" v-else>
              上传失败/数据格式错误
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="upload-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,20,50]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDatas">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import uploadFile from '@/api/upload.api';
import util from '@/tools/util';
import {
  fdcHttp
} from 'fdc-common/http'
export default {
  data() {
    return {
      totalDatas: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: []
    }
  },
  methods: {
    formatterFileName(name) {
      if (name) {
        let filterArr = name.split('_');
        filterArr.shift();
        return filterArr.join('_')
      }
    },
    formatterTime(time) {
      if (time) {
        return time.slice(0, 4) + '-' + time.slice(4, 6) + '-' + time.slice(6, 8)
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    upload(e) {
      const accountName = util.getCookie('accountName');
      const files = e.target.files
      if (files[0].size > 10 * 1024 * 1024) {
        this.showInfoMsg('error', '上传文件不得大于10M')
        e.target.value = ''
        return false
      }
      if (files.length) {
        if ('xls,xlsx'.indexOf(files[0].name.split('.').pop()) !== -1) {
          uploadFile('/datamarket/excel.upload?method=excel.upload&matchUserName=' + accountName, files)
            .then(res => {
              res = res.upload_response
              if (res.status === 'success') {
                this.showInfoMsg('success', '上传成功！')
              } else if (res.status === 'failure') {
                this.showInfoMsg('error', res.errMsg)
              }
              console.log(res, 'success')
              this.getTableData()
            })
            .catch(err => {
              this.showInfoMsg('error', '上传失败！')
              this.getTableData()
              console.log(err, 'error')
            })
        } else {
          this.showInfoMsg('error', '请上传正确格式文件')
        }
        e.target.value = ''
      }


    },
    getTableData() {
      fdcHttp.get('/datamarket', 'excel.file.show', {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res) {
          this.tableData = res.data.dataList;
          this.totalDatas = parseInt(res.data.totalDatas);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showInfoMsg(type, msg) {
      this.$message({
        type: type,
        message: msg,
        duration: 1000
      });
    }
  },
  created() {
    this.getTableData()
  }
}

</script>
<style lang='less' scoped>
.blue {
  color: #409eff;
}

.red {
  color: #fa5555;
}

.upload {
  &-tableTit {
    font-weight: 400;
    line-height: 36px;
    padding-left: 10px;
    font-size: 16px;
  }
  &-image {
    width: 90px;
    height: 90px;
    margin-left: 20px;
  }
  &-pagination {
    margin-top: 20px;
    float: right;
  }
  &-box {
    background: #fff;
    padding: 20px 0;
    margin: 20px 0 40px 0;
    border-radius: 6px;
  }
  &-btn {
    position: relative;
    margin-top: 27px;
    float: right;
    text-decoration: none;
    &.distance {
      margin-right: 30px;
    }
  }
  &-input {
    position: absolute;
    width: 88px;
    height: 36px;
    right: -1px;
    top: -1px;
    opacity: 0;
  }
}
</style>
