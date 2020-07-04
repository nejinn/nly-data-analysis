const zh = {
  dataHeader: {
    dataHeaderBackIcon: "fa fa-reply",
    dataHeaderTitle: "添加数据",
    dataHeaderHelp: "查看文档",
    dataHeaderHelpUrl: "",
    dataHeaderHelpIcon: "fa fa-question-circle"
  },
  addDataSource: {
    step: [
      { num: "1", text: "上传文件" },
      { num: "2", text: "预览数据" },
      { num: "3", text: "工作表设置" }
    ],
    cardHeaderTitle: [
      "请选择要上传的文件",
      "请检查上传文件数据",
      "请设置上传数据文件夹"
    ],
    cardHeaderActionButton: {
      back: "上一步",
      next: "下一步"
    },

    uploadLinkText: "点击上传文件",
    uploadDragText: "或者拖拽上传",
    uploadFileIntro:
      "支持Excel和CSV文件（单个Excel最大100M，CSV最大200M）, 最多5个文件批量上传，默认识别第一个sheet文件",
    uploadFileToast: {
      title: "上传文件出错",
      content: "文件类型错误",
      variant: "danger",
      message: "的文件类型非法，请重新上传"
    },
    uploadFilePostToast: {
      title: "上传文件出错",
      content: "文件传输错误",
      variant: "warning",
      message: "的文件类型非法，请重新上传"
    },
    uploadFileExample: {
      title: "示例表格",
      tips: [
        "1.请上传有标准行列的一维数据表格。（有合并单元格的数据请处理过后再上传，否则可能出现表头识别有误）",
        "2.请注意在文件中处理好数据类型，系统会根据文件来识别对应数据的类型，目前系统只识别时间类型，数字类型，字符串类型三种类型，类型不允许修改",
        "3.日期字段需包含年月日（如2016/1/1），或年月日时分秒。（如2016/1/1 00:00:00）"
      ]
    },
    exampleData: {
      fields: ["序号", "姓名", "拜访人", "拜访日期", "地址", "部门", "进展"],
      items: [
        {
          序号: 1,
          姓名: "李白",
          拜访人: "郭嘉",
          拜访日期: "2020-07-01",
          地址: "中国北京",
          部门: "销售部",
          进展: "初次拜访"
        },
        {
          序号: 2,
          姓名: "刘备",
          拜访人: "郭嘉",
          拜访日期: "2020-07-01",
          地址: "中国北京",
          部门: "销售部",
          进展: "初次拜访"
        },
        {
          序号: 3,
          姓名: "曹操",
          拜访人: "郭嘉",
          拜访日期: "2020-07-01",
          地址: "中国北京",
          部门: "销售部",
          进展: "初次拜访"
        },
        {
          序号: 4,
          姓名: "孙权",
          拜访人: "郭嘉",
          拜访日期: "2020-07-01",
          地址: "中国北京",
          部门: "销售部",
          进展: "初次拜访"
        }
      ]
    },
    previewTableTypeIcon: {
      time: {
        name: "datetime64[ns]",
        icon: "fa fa-calendar",
        text: "时间类型"
      },
      text: { name: "object", icon: "fa fa-text-width", text: "字符串类型" },
      int: { name: "int64", icon: "fa fa-list-ol", text: "数字类型" },
      index: { name: "index", icon: "", text: "" }
    }
  }
};

export default zh;
