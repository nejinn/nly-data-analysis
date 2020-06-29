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
          col-class="text-center"
          :style="item.active ? null : 'opacity: 0.5'"
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
            row-class="add-data-source-card-upload-tips"
            align-h="center"
            align-v="center"
          >
            <nly-col>
              <nly-form-input type="file" />
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
      step: this.$lang.addDataSource.step
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
  }
};
</script>
