<template>
  <nly-navbar variant="lightlight" navbar-class="shadow-lg">
    <nly-navbar-nav>
      <nly-nav-item @click="goBack">
        <nly-icon :icon="dataHeaderBackIcon" />
      </nly-nav-item>
      <nly-nav-item>
        <h1 class="text-dark data-header-title">
          {{ dataHeaderTitle }}
        </h1>
      </nly-nav-item>
    </nly-navbar-nav>
    <nly-navbar-nav class="ml-auto">
      <nly-nav-item>
        <nly-link class="text-info">
          <nly-icon :icon="dataHeaderHelpIcon" />
          {{ dataHeaderHelp }}
        </nly-link>
      </nly-nav-item>
    </nly-navbar-nav>
  </nly-navbar>
</template>

<script>
export default {
  name: "NlyDataAnalysisDataHeader",
  props: {
    dataHeaderBackIcon: {
      type: String
    },
    dataHeaderTitle: {
      type: String
    },
    dataHeaderHelp: {
      type: String
    },
    dataHeaderHelpUrl: {
      type: String
    },
    dataHeaderHelpIcon: {
      type: String
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
