import Vue from "../utils/Vue";
import { mergeData } from "vue-functional-data-merge";

const name = "NlyDataAnalysisDataHeader";

export const props = {
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
};

export const NlyDataAnalysisDataHeader = Vue.extend({
  name: name,
  props,
  functional: true,
  render(h, { props, data }) {
    const childVnodes = () => [
      h("nly-navbar-nav", [
        h("nly-nav-item", [
          h("nly-icon", {
            props: {
              icon: props.dataHeaderBackIcon
            }
          })
        ]),
        h("nly-nav-item", [
          h(
            "h1",
            { class: ["text-dark", "data-header-title"] },
            props.dataHeaderTitle
          )
        ])
      ]),
      h("nly-navbar-nav", { staticClass: "ml-auto" }, [
        h("nly-nav-item", [
          h("nly-link", { staticClass: "text-info" }, [
            h("nly-icon", {
              props: { icon: props.dataHeaderHelpIcon },
              class: "data-header-help-icon"
            }),
            props.dataHeaderHelp
          ])
        ])
      ])
    ];

    return h(
      "nly-navbar",
      mergeData(data, {
        props: {
          variant: "lightlight",
          navbarClass: "shadow-lg"
        }
      }),
      [childVnodes()]
    );
  }
});
