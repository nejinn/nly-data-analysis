<template>
  <nly-container fluid container-class="add-data-source-container">
    <nly-data-analysis-data-header
      :data-header-back-icon="this.$lang.dataHeader.dataHeaderBackIcon"
      :data-header-title="this.$lang.dataHeader.dataHeaderTitle"
      :data-header-help="this.$lang.dataHeader.dataHeaderHelp"
      :data-header-help-url="this.$lang.dataHeader.dataHeaderHelpUrl"
      :data-header-help-icon="this.$lang.dataHeader.dataHeaderHelpIcon"
    />
    <nly-container>
      <nly-row
        align-h="center"
        align-v="center"
        row-class="add-data-source-step"
      >
        <nly-col
          xs="12"
          sm="4"
          md="4"
          lg="3"
          xl="2"
          :class="
            item.active
              ? 'text-center'
              : 'text-center nly-data-analysis-opacity-1'
          "
          v-for="(item, index) in step"
          :key="index"
        >
          <nly-badge :variant="item.active ? 'danger' : 'primary'" size="md">
            {{ item.num }}
          </nly-badge>
          <span :class="item.active ? 'text-danger' : ''">
            {{ item.text }}</span
          >
        </nly-col>
      </nly-row>
      <nly-card header-outline header-variant="info">
        <nly-card-header card-header-class="text-center">
          {{ this.$lang.addDataSource.cardHeaderTitle }}
        </nly-card-header>
        <nly-card-body card-body-class="add-data-source-card-upload-file">
          <nly-row
            :row-class="
              drapFileHover
                ? 'add-data-source-card-upload-tips nly-data-analysis-backgroup-gray'
                : 'add-data-source-card-upload-tips'
            "
            align-h="center"
            align-v="center"
            id="upload-file"
          >
            <nly-col col-class="text-center text-sm">
              <nly-row row-class="nly-data-analysis-padding-1">
                <nly-col>
                  <span>
                    <nly-link @click="addDataFile">{{
                      this.$lang.addDataSource.uploadLinkText
                    }}</nly-link>
                    <input
                      id="upload-file-input"
                      type="file"
                      name="image"
                      class="nly-data-analysis-upload-file-input"
                      value=""
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.csv"
                    />
                    {{ this.$lang.addDataSource.uploadDragText }}
                  </span>
                </nly-col>
              </nly-row>
              <nly-row align-h="center">
                <nly-col
                  xs="10"
                  md="6"
                  lg="4"
                  col-class="nly-data-analysis-opacity-1"
                >
                  {{ this.$lang.addDataSource.uploadFileIntro }}
                </nly-col>
              </nly-row>
            </nly-col>
          </nly-row>
        </nly-card-body>
      </nly-card>
    </nly-container>
  </nly-container>
</template>

<script>
import { NlyDataAnalysisDataHeader } from "../../components/DataHeader";
export default {
  name: "addDataSource",
  components: { "nly-data-analysis-data-header": NlyDataAnalysisDataHeader },
  data() {
    return {
      step: this.$lang.addDataSource.step,
      drapFileHover: false, //文件拖拖动到区域的hover效果
      imgArr: [],
      fileData: []
    };
  },
  created() {
    this.step.forEach((element, index) => {
      if (index === 0) {
        this.step[index]["active"] = true;
      } else {
        this.step[index]["active"] = false;
      }
    });
  },
  mounted: function() {
    const dropbox = document.getElementById("upload-file");
    dropbox.addEventListener("drop", this.drapFileConfirm);
    dropbox.addEventListener("dragleave", this.drapFileLeave);
    dropbox.addEventListener("dragenter", this.drapFileEnter);
    dropbox.addEventListener("dragover", this.drapFileOver);
  },
  beforeDestroy() {
    const dropbox = document.getElementById("upload-file");
    dropbox.removeEventListener("drop", this.drapFileConfirm, true);
    dropbox.removeEventListener("dragleave", this.drapFileLeave, true);
    dropbox.removeEventListener("dragenter", this.drapFileEnter, true);
    dropbox.removeEventListener("dragover", this.drapFileOver, true);
  },
  methods: {
    addDataFile() {
      const inputEle = document.getElementById("upload-file-input");
      inputEle.click();
    },
    getTargetNode(ele, target) {
      if (!ele || ele === document) return false;
      return ele === target ? true : this.getTargetNode(ele.parentNode, target);
    },
    drapFileConfirm(e) {
      this.drapFileHover = false;
      e.stopPropagation();
      e.preventDefault();
      const fileDataList = e.dataTransfer.files;
      this.uploadFile(fileDataList);
    },
    drapFileLeave(e) {
      const target = document.getElementById("upload-file");
      if (!this.getTargetNode(e.target, target)) {
        this.drapFileHover = false;
      }
      e.stopPropagation();
      e.preventDefault();
    },
    drapFileEnter(e) {
      e.stopPropagation();
      e.preventDefault();
      this.drapFileHover = true;
    },
    drapFileOver(e) {
      e.stopPropagation();
      e.preventDefault();
      this.drapFileHover = true;
    },
    uploadFile: function(file) {
      const acceptType = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        ".csv"
      ];

      const fileTypeList = [];
      file.forEach(element => {
        if (acceptType.indexOf(element.type) === -1) {
          fileTypeList.push(element);
        }
      });

      if (fileTypeList.length > 0) {
        const noAcceptList = [];
        fileTypeList.forEach(element => {
          noAcceptList.push(element.name);
        });
        const obj = this;
        const toastVnode = {
          content: this.$lang.addDataSource.uploadFileToast.content,
          message: `${noAcceptList.join(",  ")} ${
            this.$lang.addDataSource.uploadFileToast.message
          }`,
          title: this.$lang.addDataSource.uploadFileToast.title,
          variant: this.$lang.addDataSource.uploadFileToast.variant
        };
        this.$toast.Toast(obj, toastVnode);
        return;
      }

      this.fileData = file;
      const fd = new FormData();
      this.fileData.forEach(element => {
        fd.append("excelFile", element, element.name);
      });
      const obj = this;

      this.$api.addDataSource.getReturnData(obj, fd);
    }
  }
};
</script>
