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
      <nly-card header-outline header-variant="info" :loading="loading">
        <nly-card-header card-header-class="text-center">
          {{ cardTtitle }}
          <nly-card-tool v-show="!step[0].active">
            <nly-button-group size="sm">
              <nly-button variant="warning" @click="goPreStep">
                {{
                  this.$lang.addDataSource.cardHeaderActionButton.back
                }}</nly-button
              >
              <nly-button variant="primary" @click="goNextStep">
                {{
                  this.$lang.addDataSource.cardHeaderActionButton.next
                }}</nly-button
              >
            </nly-button-group>
          </nly-card-tool>
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
            ref="upload-file"
            v-show="step[0].active"
          >
            <nly-col col-class="text-center text-sm">
              <nly-row row-class="nly-data-analysis-padding-1">
                <nly-col>
                  <span>
                    <nly-link @click="addDataFile">{{
                      this.$lang.addDataSource.uploadLinkText
                    }}</nly-link>
                    <input
                      ref="upload-file-input"
                      type="file"
                      name="image"
                      class="nly-data-analysis-upload-file-input"
                      value=""
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.csv"
                      @change="getInputFIle"
                      multiple="multiple"
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

          <nly-row class="nly-data-analysis-margin-2" v-show="step[0].active">
            <nly-col>
              <nly-row>
                <h6>
                  <b>{{ this.$lang.addDataSource.uploadFileExample.title }}</b>
                </h6>
              </nly-row>
              <div
                v-for="(item, index) in this.$lang.addDataSource
                  .uploadFileExample.tips"
                :key="index"
              >
                <span>{{ item }}</span>
              </div>

              <div class="table-responsive nly-data-analysis-margin-1">
                <nly-table
                  :striped="true"
                  :bordered="true"
                  :items="items"
                  :fields="fields"
                  :small="true"
                  head-variant="light"
                ></nly-table>
              </div>
            </nly-col>
          </nly-row>

          <nly-row v-show="step[1].active">
            <nly-col>
              <nly-card>
                <nly-tabs card small lazy>
                  <nly-tab
                    lazy
                    v-for="(item, index) in tableData"
                    :key="index"
                    :title="item.name"
                    :active="index === 0 ? true : false"
                  >
                    <div class="table-responsive">
                      <nly-table
                        sticky-header="450px"
                        :striped="true"
                        :bordered="true"
                        :fields="item.data.fields"
                        :items="item.data.items"
                        :small="true"
                        hover
                        head-variant="light"
                        thead-class="nly-data-analysis-preview-data-table text-center"
                        tbody-class=" text-center nly-data-analysis-preview-data-table"
                        thead-tr-class="nly-data-analysis-preview-data-table"
                      >
                        <template v-slot:cell(index)="data">
                          {{ data.index + 1 }}
                        </template>

                        <template v-slot:cell()="data">
                          <span class="text-sm m-1 w-100">
                            {{ data.value }}
                          </span>
                        </template>

                        <template v-slot:head()="data">
                          <nly-icon
                            size="sm"
                            class="text-info mr-1"
                            :icon="
                              data.field.type == previewTableTypeIcon.text.name
                                ? previewTableTypeIcon.text.icon
                                : data.field.type ==
                                  previewTableTypeIcon.int.name
                                ? previewTableTypeIcon.int.icon
                                : data.field.type ==
                                  previewTableTypeIcon.index.name
                                ? previewTableTypeIcon.index.icon
                                : previewTableTypeIcon.time.icon
                            "
                            v-nly-tooltip.hover="{ variant: 'info' }"
                            :title="
                              data.field.type == previewTableTypeIcon.text.name
                                ? previewTableTypeIcon.text.text
                                : data.field.type ==
                                  previewTableTypeIcon.int.name
                                ? previewTableTypeIcon.int.text
                                : data.field.type ==
                                  previewTableTypeIcon.index.name
                                ? previewTableTypeIcon.index.text
                                : previewTableTypeIcon.time.text
                            "
                          />
                          <span class="text-sm m-1 w-100">
                            {{ data.label }}
                          </span>
                        </template>
                      </nly-table>
                      <!-- <nly-table-simple
                        sticky-header="450px"
                        striped
                        small
                        hover
                        bordered
                      >
                        <nly-thead>
                          <nly-tr>
                            <nly-th
                              sticky-column
                              class="nly-data-analysis-preview-data-table text-center"
                            >
                              序号</nly-th
                            >
                            <nly-th
                              v-for="(headerItem, index) in item.data.fields"
                              :key="index"
                              class="nly-data-analysis-preview-data-table text-center"
                              v-nly-tooltip.hover.top
                              :title="
                                headerItem.type ==
                                previewTableTypeIcon.text.name
                                  ? previewTableTypeIcon.text.text
                                  : headerItem.type ==
                                    previewTableTypeIcon.int.name
                                  ? previewTableTypeIcon.int.text
                                  : previewTableTypeIcon.time.text
                              "
                            >
                              <nly-icon
                                size="sm"
                                class="text-info mr-1"
                                :icon="
                                  headerItem.type ==
                                  previewTableTypeIcon.text.name
                                    ? previewTableTypeIcon.text.icon
                                    : headerItem.type ==
                                      previewTableTypeIcon.int.name
                                    ? previewTableTypeIcon.int.icon
                                    : previewTableTypeIcon.time.icon
                                "
                              />
                              {{ headerItem.name }}
                            </nly-th>
                          </nly-tr>
                        </nly-thead>
                        <nly-tbody>
                          <nly-tr
                            v-for="(item, index) in item.data.items"
                            :key="index"
                          >
                            <nly-td
                              sticky-column
                              variant="primary"
                              class="text-center"
                            >
                              {{ index + 1 }}
                            </nly-td>
                            <nly-td
                              v-for="(cellTem, key, index) in item"
                              :key="index"
                              class="nly-data-analysis-preview-data-table"
                            >
                              <span class="text-sm m-1 w-100">{{
                                cellTem
                              }}</span>
                            </nly-td>
                          </nly-tr>
                        </nly-tbody>
                      </nly-table-simple> -->
                    </div>
                  </nly-tab>
                </nly-tabs>
              </nly-card>
            </nly-col>
          </nly-row>
        </nly-card-body>
      </nly-card>
    </nly-container>
  </nly-container>
</template>

<script>
import NlyDataAnalysisDataHeader from "../../components/DataHeader.vue";
export default {
  name: "addDataSource",
  components: { "nly-data-analysis-data-header": NlyDataAnalysisDataHeader },
  data() {
    return {
      step: this.$lang.addDataSource.step,
      drapFileHover: false, //文件拖拖动到区域的hover效果
      fileData: [],
      fields: this.$lang.addDataSource.exampleData.fields,
      items: this.$lang.addDataSource.exampleData.items,
      loading: false,
      tableData: [],
      previewTableTypeIcon: this.$lang.addDataSource.previewTableTypeIcon
    };
  },
  computed: {
    cardTtitle() {
      let result = "";
      this.step.forEach((element, index) => {
        if (element.active) {
          result = this.$lang.addDataSource.cardHeaderTitle[index];
        }
      });
      return result;
    }
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
    const dropbox = this.$refs["upload-file"];
    dropbox.addEventListener("drop", this.drapFileConfirm);
    dropbox.addEventListener("dragleave", this.drapFileLeave);
    dropbox.addEventListener("dragenter", this.drapFileEnter);
    dropbox.addEventListener("dragover", this.drapFileOver);
  },
  beforeDestroy() {
    const dropbox = this.$refs["upload-file"];
    dropbox.removeEventListener("drop", this.drapFileConfirm, true);
    dropbox.removeEventListener("dragleave", this.drapFileLeave, true);
    dropbox.removeEventListener("dragenter", this.drapFileEnter, true);
    dropbox.removeEventListener("dragover", this.drapFileOver, true);
  },
  methods: {
    goNextStep() {
      this.step.forEach((element, index) => {
        if (element.active) {
          if (index < this.step.length - 1) {
            const deepStep = this.step[index];
            deepStep.active = false;
            this.$set(this.step, index, deepStep);
            this.$set(this.step[index + 1], "active", true);
            this.loading = false;
          }
        }
      });
    },
    goPreStep() {
      this.step.forEach((element, index) => {
        if (element.active) {
          const deepStep = this.step[index];
          deepStep.active = false;
          this.$set(this.step, index, deepStep);
          this.$set(this.step[index - 1], "active", true);
          this.loading = false;
          if (index === 1) {
            this.fileData = [];
            this.tableData = [];
          }
        }
      });
    },
    fileCheck(file) {
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
        return false;
      }

      this.fileData = file;
      return true;
    },
    getInputFIle() {
      const inputEle = this.$refs["upload-file-input"];
      console.log(inputEle.files);
      const fileChecked = this.fileCheck(inputEle.files);
      if (!fileChecked) {
        return;
      }
      this.postFile();
    },
    addDataFile() {
      const inputEle = this.$refs["upload-file-input"];
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
      const target = this.$refs["upload-file"];
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
      const fileChecked = this.fileCheck(file);

      if (!fileChecked) {
        return;
      }

      this.postFile();
    },
    postFile() {
      const fd = new FormData();
      this.fileData.forEach(element => {
        fd.append("excelFile", element, element.name);
      });
      const obj = this;
      this.loading = true;
      this.$api.addDataSource.getReturnData(obj, fd);
    }
  }
};
</script>
