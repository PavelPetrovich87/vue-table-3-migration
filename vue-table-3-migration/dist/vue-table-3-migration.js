import D from "axios";
import { openBlock as i, createElementBlock as l, createElementVNode as g, normalizeStyle as m, resolveComponent as $, Fragment as b, renderList as p, createBlock as y, resolveDynamicComponent as C, normalizeClass as u, createCommentVNode as f, createVNode as F, renderSlot as w, withDirectives as L, vShow as B, toDisplayString as O } from "vue";
const k = {
  props: {
    rowData: {
      type: Object,
      default: null
    },
    rowIndex: {
      type: Number
    },
    rowField: {
      type: Object
    },
    isHeader: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: ""
    },
    vuetable: {
      type: Object,
      default: null
    }
  }
}, E = {
  mixins: [k],
  methods: {
    toggleCheckbox(e, t) {
      this.vuetable.onCheckboxToggled(t.target.checked, this.rowField.name, e);
    },
    toggleAllCheckbox(e) {
      this.vuetable.onCheckboxToggledAll(e.target.checked);
    },
    isSelected(e) {
      return this.vuetable.isSelectedRow(e[this.vuetable.trackBy]);
    },
    isAllItemsInCurrentPageSelected() {
      if (!this.vuetable.tableData)
        return;
      let e = this.vuetable.trackBy, t = this.$el.querySelector("input[type=checkbox]"), s = this.vuetable.tableData.filter((r) => this.vuetable.isSelectedRow(r[e]));
      return s.length <= 0 ? (t.indeterminate = !1, !1) : s.length < this.vuetable.perPage ? (t.indeterminate = !0, !0) : (t.indeterminate = !1, !0);
    }
  }
}, v = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, d] of t)
    s[r] = d;
  return s;
}, A = {
  name: "vuetable-field-checkbox",
  mixins: [E]
}, x = {
  key: 0,
  class: "vuetable-th-component-checkbox"
}, N = ["checked"], q = {
  key: 1,
  class: "vuetable-td-component-checkbox"
}, z = ["checked"];
function W(e, t, s, r, d, a) {
  return e.isHeader ? (i(), l("th", x, [
    g("input", {
      type: "checkbox",
      onChange: t[0] || (t[0] = (h) => e.toggleAllCheckbox(h)),
      checked: e.isAllItemsInCurrentPageSelected()
    }, null, 40, N)
  ])) : (i(), l("td", q, [
    g("input", {
      type: "checkbox",
      onChange: t[1] || (t[1] = (h) => e.toggleCheckbox(e.rowData, h)),
      checked: e.isSelected(e.rowData)
    }, null, 40, z)
  ]));
}
const V = /* @__PURE__ */ v(A, [["render", W]]), G = {
  name: "vuetable-field-handle",
  mixins: [k],
  computed: {
    css() {
      return this.vuetable.$_css;
    }
  },
  methods: {
    renderIconTag(e, t = "") {
      return typeof this.css.renderIcon > "u" ? `<i class="${e.join(" ")}" ${t}></i>` : this.css.renderIcon(e, t);
    }
  }
}, U = ["innerHTML"], K = ["innerHTML"];
function Q(e, t, s, r, d, a) {
  return e.isHeader ? (i(), l("th", {
    key: 0,
    class: "vuetable-th-component-handle",
    innerHTML: e.title
  }, null, 8, U)) : (i(), l("td", {
    key: 1,
    class: "vuetable-td-component-handle",
    innerHTML: a.renderIconTag(["handle-icon", a.css.handleIcon])
  }, null, 8, K));
}
const T = /* @__PURE__ */ v(G, [["render", Q]]), Y = {
  name: "vuetable-field-sequence",
  mixins: [k],
  methods: {
    renderSequence() {
      return this.vuetable.tablePagination ? this.vuetable.tablePagination.from + this.rowIndex : 1 + this.rowIndex;
    }
  }
}, Z = ["innerHTML"], J = ["innerHTML"];
function X(e, t, s, r, d, a) {
  return e.isHeader ? (i(), l("th", {
    key: 0,
    class: "vuetable-th-component-sequence",
    innerHTML: e.title
  }, null, 8, Z)) : (i(), l("td", {
    key: 1,
    class: "vuetable-td-component-sequence",
    innerHTML: a.renderSequence()
  }, null, 8, J));
}
const R = /* @__PURE__ */ v(Y, [["render", X]]);
const ee = {
  name: "vuetable-th-gutter",
  computed: {
    vuetable() {
      return this.$parent;
    }
  }
};
function te(e, t, s, r, d, a) {
  return i(), l("th", {
    style: m({ width: a.vuetable.scrollBarWidth }),
    class: "vuetable-th-gutter"
  }, null, 4);
}
const H = /* @__PURE__ */ v(ee, [["render", te]]), se = {
  components: {
    "vuetable-field-checkbox": V,
    "vuetable-field-handle": T,
    "vuetable-field-sequence": R,
    VuetableColGutter: H
  },
  computed: {
    sortOrder() {
      return this.$parent.sortOrder;
    },
    css() {
      return this.$parent.$_css;
    },
    vuetable() {
      return this.$parent;
    }
  },
  methods: {
    stripPrefix(e) {
      return e.replace(this.vuetable.fieldPrefix, "");
    },
    headerClass(e, t) {
      return [
        e + "-" + this.toSnakeCase(t.name),
        t.titleClass || "",
        this.sortClass(t),
        { sortable: this.vuetable.isSortable(t) }
      ];
    },
    toSnakeCase(e) {
      return typeof e == "string" && e.replace(/([A-Z])/g, (t) => "_" + t.toLowerCase()).replace(" ", "_").replace(".", "_");
    },
    sortClass(e) {
      let t = "", s = this.currentSortOrderPosition(e);
      return s !== !1 && (t = this.sortOrder[s].direction == "asc" ? this.css.ascendingClass : this.css.descendingClass), t;
    },
    sortIcon(e) {
      let t = this.css.sortableIcon, s = this.currentSortOrderPosition(e);
      return s !== !1 && (t = this.sortOrder[s].direction == "asc" ? this.css.ascendingIcon : this.css.descendingIcon), t;
    },
    isInCurrentSortGroup(e) {
      return this.currentSortOrderPosition(e) !== !1;
    },
    hasSortableIcon(e) {
      return this.vuetable.isSortable(e) && this.css.sortableIcon != "";
    },
    currentSortOrderPosition(e) {
      if (!this.vuetable.isSortable(e))
        return !1;
      for (let t = 0; t < this.sortOrder.length; t++)
        if (this.fieldIsInSortOrderPosition(e, t))
          return t;
      return !1;
    },
    fieldIsInSortOrderPosition(e, t) {
      return this.sortOrder[t].field === e.name && this.sortOrder[t].sortField === e.sortField;
    },
    renderTitle(e) {
      let t = this.getTitle(e);
      if (t.length > 0 && this.isInCurrentSortGroup(e) || this.hasSortableIcon(e)) {
        let s = `opacity:${this.sortIconOpacity(e)};position:relative;float:right`, r = this.vuetable.showSortIcons ? this.renderIconTag(["sort-icon", this.sortIcon(e)], `style="${s}"`) : "";
        return t + " " + r;
      }
      return t;
    },
    getTitle(e) {
      return typeof e.title == "function" ? e.title() : typeof e.title > "u" ? e.name.replace(".", " ") : e.title;
    },
    sortIconOpacity(e) {
      let t = 1, s = 0.3, r = 0.3, d = this.sortOrder.length, a = this.currentSortOrderPosition(e);
      return t - d * r < s && (r = (t - s) / (d - 1)), t - a * r;
    },
    renderIconTag(e, t = "") {
      return typeof this.css.renderIcon > "u" ? `<i class="${e.join(" ")}" ${t}></i>` : this.css.renderIcon(e, t);
    },
    onColumnHeaderClicked(e, t) {
      this.vuetable.orderBy(e, t);
    }
  }
}, ae = ["innerHTML", "onClick"], ie = ["onClick", "id", "innerHTML"];
function le(e, t, s, r, d, a) {
  const h = $("vuetable-col-gutter");
  return i(), l("tr", null, [
    (i(!0), l(b, null, p(a.vuetable.tableFields, (n, c) => (i(), l(b, null, [
      n.visible ? (i(), l(b, { key: 0 }, [
        a.vuetable.isFieldComponent(n.name) ? (i(), y(C(n.name), {
          "row-field": n,
          "is-header": !0,
          title: a.renderTitle(n),
          vuetable: a.vuetable,
          key: c,
          class: u(a.headerClass("vuetable-th-component", n)),
          style: m({ width: n.width }),
          "onVuetable:headerEvent": a.vuetable.onHeaderEvent,
          onClick: (o) => a.onColumnHeaderClicked(n, o)
        }, null, 40, ["row-field", "title", "vuetable", "class", "style", "onVuetable:headerEvent", "onClick"])) : a.vuetable.isFieldSlot(n.name) ? (i(), l("th", {
          class: u(a.headerClass("vuetable-th-slot", n)),
          key: c,
          style: m({ width: n.width }),
          innerHTML: a.renderTitle(n),
          onClick: (o) => a.onColumnHeaderClicked(n, o)
        }, null, 14, ae)) : (i(), l("th", {
          onClick: (o) => a.onColumnHeaderClicked(n, o),
          key: c,
          id: "_" + n.name,
          class: u(a.headerClass("vuetable-th", n)),
          style: m({ width: n.width }),
          innerHTML: a.renderTitle(n)
        }, null, 14, ie))
      ], 64)) : f("", !0)
    ], 64))), 256)),
    a.vuetable.scrollVisible ? (i(), y(h, { key: 0 })) : f("", !0)
  ]);
}
const I = /* @__PURE__ */ v(se, [["render", le]]), ne = {
  name: "vuetable-col-group",
  props: {
    isHeader: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    vuetable() {
      return this.$parent;
    }
  },
  methods: {
    columnClass(e, t) {
      let s = typeof e.name == "object" && e.name !== null ? e.name.name : e.name;
      return s = s.replace(this.fieldPrefix, ""), ["vuetable-col-" + s, e.titleClass];
    }
  }
};
function re(e, t, s, r, d, a) {
  return i(), l("colgroup", null, [
    (i(!0), l(b, null, p(a.vuetable.tableFields, (h, n) => (i(), l(b, null, [
      h.visible ? (i(), l("col", {
        key: n,
        style: m({ width: h.width }),
        class: u(a.columnClass(h, n))
      }, null, 6)) : f("", !0)
    ], 64))), 256)),
    s.isHeader && a.vuetable.scrollVisible ? (i(), l("col", {
      key: 0,
      style: m({ width: a.vuetable.scrollBarWidth }),
      class: "vuetable-col-gutter"
    }, null, 4)) : f("", !0)
  ]);
}
const oe = /* @__PURE__ */ v(ne, [["render", re]]), _ = {
  table: {
    tableWrapper: "",
    tableHeaderClass: "fixed",
    tableBodyClass: "fixed",
    tableClass: "ui blue selectable unstackable celled table",
    loadingClass: "loading",
    ascendingIcon: "blue chevron up icon",
    descendingIcon: "blue chevron down icon",
    ascendingClass: "sorted-asc",
    descendingClass: "sorted-desc",
    sortableIcon: "grey sort icon",
    handleIcon: "grey sidebar icon"
  },
  pagination: {
    wrapperClass: "ui right floated pagination menu",
    activeClass: "active large",
    disabledClass: "disabled",
    pageClass: "item",
    linkClass: "icon item",
    paginationClass: "ui bottom attached segment grid",
    paginationInfoClass: "left floated left aligned six wide column",
    dropdownClass: "ui search dropdown",
    icons: {
      first: "angle double left icon",
      prev: "left chevron icon",
      next: "right chevron icon",
      last: "angle double right icon"
    }
  },
  paginationInfo: {
    infoClass: "left floated left aligned six wide column"
  }
};
const ue = {
  name: "Vuetable",
  components: {
    VuetableRowHeader: I,
    VuetableColGroup: oe
  },
  props: {
    fields: {
      type: Array,
      required: !0
    },
    loadOnStart: {
      type: Boolean,
      default: !0
    },
    apiUrl: {
      type: String,
      default: ""
    },
    httpMethod: {
      type: String,
      default: "get",
      validator: (e) => ["get", "post"].indexOf(e) > -1
    },
    reactiveApiUrl: {
      type: Boolean,
      default: !0
    },
    apiMode: {
      type: Boolean,
      default: !0
    },
    data: {
      type: [Array, Object],
      default: null
    },
    dataManager: {
      type: Function,
      default: null
    },
    dataPath: {
      type: String,
      default: "data"
    },
    paginationPath: {
      type: String,
      default: "links.pagination"
    },
    queryParams: {
      type: [Object, Function],
      default() {
        return {
          sort: "sort",
          page: "page",
          perPage: "per_page"
        };
      }
    },
    appendParams: {
      type: Object,
      default() {
        return {};
      }
    },
    httpOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    httpFetch: {
      type: Function,
      default: null
    },
    perPage: {
      type: Number,
      default: 10
    },
    initialPage: {
      type: Number,
      default: 1
    },
    firstPage: {
      type: Number,
      default: 1
    },
    sortOrder: {
      type: Array,
      default() {
        return [];
      }
    },
    multiSort: {
      type: Boolean,
      default: !1
    },
    tableHeight: {
      type: String,
      default: null
    },
    multiSortKey: {
      type: String,
      default: "alt"
    },
    rowClass: {
      type: [String, Function],
      default: ""
    },
    detailRowComponent: {
      type: [String, Object],
      default: ""
    },
    comparisonRowComponent: {
      type: [String, Object],
      default: ""
    },
    detailRowTransition: {
      type: String,
      default: ""
    },
    detailRowClass: {
      type: [String, Function],
      default: "vuetable-detail-row"
    },
    detailRowOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    trackBy: {
      type: String,
      default: "id"
    },
    css: {
      type: Object,
      default() {
        return {};
      }
    },
    minRows: {
      type: Number,
      default: 0
    },
    silent: {
      type: Boolean,
      default: !1
    },
    noDataTemplate: {
      type: String,
      default() {
        return "No Data Available";
      }
    },
    showSortIcons: {
      type: Boolean,
      default: !0
    },
    headerRows: {
      type: Array,
      default() {
        return ["VuetableRowHeader"];
      }
    },
    transform: {
      type: Function,
      default: null
    },
    sortParams: {
      type: Function,
      default: null
    },
    fieldPrefix: {
      type: String,
      default() {
        return "vuetable-field-";
      }
    },
    eventPrefix: {
      type: String,
      default() {
        return "vuetable:";
      }
    }
  },
  data() {
    return {
      tableFields: [],
      tableData: null,
      tablePagination: null,
      currentPage: this.initialPage,
      selectedTo: [],
      visibleDetailRows: [],
      lastScrollPosition: 0,
      scrollBarWidth: "17px",
      scrollVisible: !1,
      $_css: {}
    };
  },
  computed: {
    version: () => VERSION,
    useDetailRow() {
      return this.dataIsAvailable ? this.detailRowComponent !== "" : !1;
    },
    dataIsAvailable() {
      return this.tableData ? this.tableData.length > 0 : !1;
    },
    hasRowIdentifier() {
      return this.tableData && typeof this.tableData[0][this.trackBy] < "u";
    },
    countVisibleFields() {
      return this.tableFields.filter((e) => e.visible).length;
    },
    countTableData() {
      return this.tableData === null ? 0 : this.tableData.length;
    },
    displayEmptyDataRow() {
      return this.countTableData === 0 && this.noDataTemplate.length > 0;
    },
    lessThanMinRows() {
      return this.tableData === null || this.tableData.length === 0 ? !0 : this.tableData.length < this.minRows;
    },
    blankRows() {
      return this.tableData === null || this.tableData.length === 0 ? this.minRows : this.tableData.length >= this.minRows ? 0 : this.minRows - this.tableData.length;
    },
    isApiMode() {
      return this.apiMode;
    },
    isDataMode() {
      return !this.apiMode;
    },
    isFixedHeader() {
      return this.tableHeight != null;
    },
    vuetable() {
      return this;
    }
  },
  created() {
    this.mergeCss(), this.normalizeFields(), this.normalizeSortOrder(), this.$nextTick(() => {
      this.fireEvent("initialized", this.tableFields);
    });
  },
  mounted() {
    if (this.loadOnStart && this.loadData(), this.isFixedHeader) {
      this.scrollBarWidth = this.getScrollBarWidth() + "px";
      let e = this.$el.getElementsByClassName("vuetable-body-wrapper")[0];
      e != null && e.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    let e = this.$el.getElementsByClassName("vuetable-body-wrapper")[0];
    e != null && e.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    multiSort(e, t) {
      e === !1 && this.sortOrder.length > 1 && (this.sortOrder.splice(1), this.loadData());
    },
    apiUrl(e, t) {
      this.reactiveApiUrl && e !== t && this.refresh();
    },
    data(e, t) {
      this.setData(e);
    },
    tableHeight(e, t) {
      this.checkScrollbarVisibility();
    },
    fields(e, t) {
      this.normalizeFields();
    },
    perPage(e, t) {
      this.reload();
    }
  },
  methods: {
    getScrollBarWidth() {
      const e = document.createElement("div"), t = document.createElement("div");
      e.style.visibility = "hidden", e.style.width = "100px", t.style.width = "100%", e.appendChild(t), document.body.appendChild(e);
      const s = e.offsetWidth;
      e.style.overflow = "scroll";
      const r = t.offsetWidth;
      return document.body.removeChild(e), s - r;
    },
    handleScroll(e) {
      let t = e.currentTarget.scrollLeft;
      if (t != this.lastScrollPosition) {
        let s = this.$el.getElementsByClassName("vuetable-head-wrapper")[0];
        s != null && (s.scrollLeft = t), this.lastScrollPosition = t;
      }
    },
    mergeCss() {
      this.$_css = { ..._.table, ...this.css };
    },
    bodyClass(e, t) {
      return [e, t.dataClass];
    },
    normalizeFields() {
      if (typeof this.fields > "u") {
        this.warn('You need to provide "fields" prop.');
        return;
      }
      this.tableFields = [], this.fields.forEach((e, t) => {
        this.tableFields.push(this.newField(e, t));
      });
    },
    newField(e, t) {
      let s = {
        name: "",
        titleClass: "",
        dataClass: "",
        sortField: null,
        formatter: null,
        visible: !0,
        width: null,
        $_index: t
      };
      if (typeof e == "string")
        return Object.assign({}, s, {
          name: this.normalizeFieldName(e),
          title: this.makeTitle(e)
        });
      let r = Object.assign({}, s, e);
      return r.name = this.normalizeFieldName(r.name), r.title === void 0 && (r.title = this.makeTitle(r.name)), r.formatter !== null && typeof r.formatter != "function" && (console.error(r.name + " field formatter must be a function"), r.formatter = null), r;
    },
    normalizeFieldName(e) {
      return e instanceof Object ? e : typeof e == "string" && e.replace("__", this.fieldPrefix);
    },
    setData(e) {
      if (!(e === null || typeof e > "u")) {
        if (this.fireEvent("loading"), Array.isArray(e)) {
          this.tableData = e, this.fireEvent("loaded");
          return;
        }
        this.tableData = this.getObjectValue(e, this.dataPath, null), this.tablePagination = this.getObjectValue(e, this.paginationPath, null), this.$nextTick(() => {
          this.checkIfRowIdentifierExists(), this.updateHeader(), this.fireEvent("pagination-data", this.tablePagination), this.fireEvent("loaded");
        });
      }
    },
    checkIfRowIdentifierExists() {
      if (!!this.dataIsAvailable)
        return this.hasRowIdentifier ? !0 : (this.warn('Invalid your data! Use "track-by" prop to specify.'), !1);
    },
    makeTitle(e) {
      return this.isFieldComponent(e) ? "" : this.titleCase(e.replace(".", " "));
    },
    getFieldTitle(e) {
      return typeof e.title == "function" ? e.title() : e.title;
    },
    renderNormalField(e, t) {
      return this.hasFormatter(e) ? this.callFormatter(e, t) : this.getObjectValue(t, e.name, "");
    },
    isFieldComponent(e) {
      return e instanceof Object ? !0 : e.slice(0, this.fieldPrefix.length) === this.fieldPrefix || e.slice(0, 2) === "__";
    },
    isFieldSlot(e) {
      return typeof this.$scopedSlots[e] < "u";
    },
    titleCase(e) {
      return e.replace(/\w+/g, (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
    },
    camelCase(e, t = "_") {
      return e.split(t).map((s) => self.titleCase(s)).join("");
    },
    loadData(e = this.loadSuccess, t = this.loadFailed) {
      if (this.isDataMode) {
        this.handleDataMode();
        return;
      }
      return this.fireEvent("loading"), this.httpOptions.params = this.getAppendParams(this.getAllQueryParams()), this.fetch(this.apiUrl, this.httpOptions).then(
        e,
        t
      ).catch(() => t());
    },
    fetch(e, t) {
      if (this.httpFetch)
        return this.httpFetch(e, t);
      if (this.httpMethod === "get")
        return D.get(e, t);
      {
        let s = t.params;
        return delete t.params, D.post(e, s, t);
      }
    },
    loadSuccess(e) {
      this.fireEvent("load-success", e);
      let t = this.transform ? this.transform(e.data) : e.data;
      this.tableData = this.getObjectValue(t, this.dataPath, null), this.tablePagination = this.getObjectValue(t, this.paginationPath, null), this.tablePagination === null && this.warn(
        'vuetable: pagination-path "' + this.paginationPath + `" not found. It looks like the data returned from the server does not have pagination information or you may have set it incorrectly.
You can explicitly suppress this warning by setting pagination-path="".`
      ), this.$nextTick(() => {
        this.checkIfRowIdentifierExists(), this.updateHeader(), this.fireEvent("pagination-data", this.tablePagination), this.fireEvent("loaded");
      });
    },
    updateHeader() {
      setTimeout(this.checkScrollbarVisibility, 80);
    },
    checkScrollbarVisibility() {
      this.$nextTick(() => {
        let e = this.$el.getElementsByClassName("vuetable-body-wrapper")[0];
        e != null && (this.scrollVisible = e.scrollHeight > e.clientHeight, this.fireEvent("scrollbar-visible", this.scrollVisible));
      });
    },
    loadFailed(e) {
      console.error("load-error", e), this.fireEvent("load-error", e), this.fireEvent("loaded");
    },
    fireEvent() {
      if (arguments.length === 1)
        return this.$emit(this.eventPrefix + arguments[0]);
      if (arguments.length > 1) {
        let e = Array.from(arguments);
        return e[0] = this.eventPrefix + e[0], this.$emit.apply(this, e);
      }
    },
    warn(e) {
      this.silent || console.warn(e);
    },
    getAllQueryParams() {
      let e = {};
      return typeof this.queryParams == "function" ? (e = this.queryParams(this.sortOrder, this.currentPage, this.perPage), typeof e == "object" ? e : {}) : (e[this.queryParams.sort] = this.getSortParam(), e[this.queryParams.page] = this.currentPage, e[this.queryParams.perPage] = this.perPage, e);
    },
    getSortParam() {
      return !this.sortOrder || this.sortOrder.field == "" ? "" : typeof this.sortParams == "function" ? this.sortParams(this.sortOrder) : this.getDefaultSortParam();
    },
    getDefaultSortParam() {
      return this.sortOrder.map((e) => `${e.sortField}|${e.direction}`).join(",");
    },
    getAppendParams(e) {
      for (let t in this.appendParams)
        e[t] = this.appendParams[t];
      return e;
    },
    isSortable(e) {
      return e.sortField !== null;
    },
    currentSortOrderPosition(e) {
      if (!this.isSortable(e))
        return !1;
      for (let t = 0; t < this.sortOrder.length; t++)
        if (this.fieldIsInSortOrderPosition(e, t))
          return t;
      return !1;
    },
    fieldIsInSortOrderPosition(e, t) {
      return this.sortOrder[t].field === e.name && this.sortOrder[t].sortField === e.sortField;
    },
    orderBy(e, t) {
      if (!this.isSortable(e))
        return;
      let s = this.multiSortKey.toLowerCase() + "Key";
      this.multiSort && t[s] ? this.multiColumnSort(e) : this.singleColumnSort(e), this.currentPage = this.firstPage, (this.apiMode || this.dataManager) && this.loadData();
    },
    addSortColumn(e, t) {
      this.sortOrder.push({
        field: e.name,
        sortField: e.sortField,
        direction: "asc"
      });
    },
    removeSortColumn(e) {
      this.sortOrder.splice(e, 1);
    },
    setSortColumnDirection(e, t) {
      this.sortOrder[e].direction = t;
    },
    multiColumnSort(e) {
      let t = this.currentSortOrderPosition(e);
      t === !1 ? this.addSortColumn(e, "asc") : this.sortOrder[t].direction === "asc" ? this.setSortColumnDirection(t, "desc") : this.removeSortColumn(t);
    },
    singleColumnSort(e) {
      if (this.sortOrder.length === 0) {
        this.addSortColumn(e, "asc");
        return;
      }
      this.sortOrder.splice(1), this.fieldIsInSortOrderPosition(e, 0) ? this.sortOrder[0].direction = this.sortOrder[0].direction === "asc" ? "desc" : "asc" : this.sortOrder[0].direction = "asc", this.sortOrder[0].field = e.name, this.sortOrder[0].sortField = e.sortField;
    },
    clearSortOrder() {
      this.sortOrder = [];
    },
    hasFormatter(e) {
      return typeof e.formatter == "function";
    },
    callFormatter(e, t) {
      if (!!this.hasFormatter(e) && typeof e.formatter == "function")
        return e.formatter(this.getObjectValue(t, e.name), this);
    },
    getObjectValue(e, t, s) {
      s = typeof s > "u" ? null : s;
      let r = e;
      return t.trim() != "" && t.split(".").forEach((a) => {
        if (r !== null && typeof r[a] < "u" && r[a] !== null)
          r = r[a];
        else {
          r = s;
          return;
        }
      }), r;
    },
    selectId(e) {
      this.isSelectedRow(e) || this.selectedTo.push(e);
    },
    unselectId(e) {
      this.selectedTo = this.selectedTo.filter((t) => t !== e);
    },
    isSelectedRow(e) {
      return this.selectedTo.indexOf(e) >= 0;
    },
    clearSelectedValues() {
      this.selectedTo = [];
    },
    gotoPreviousPage() {
      this.currentPage > this.firstPage && (this.currentPage--, this.loadData());
    },
    gotoNextPage() {
      this.currentPage < this.tablePagination.last_page && (this.currentPage++, this.loadData());
    },
    gotoPage(e) {
      e != this.currentPage && e >= this.firstPage && e <= this.tablePagination.last_page && (this.currentPage = e, this.loadData());
    },
    isVisibleDetailRow(e) {
      return this.visibleDetailRows.indexOf(e) >= 0;
    },
    showDetailRow(e) {
      this.isVisibleDetailRow(e) || this.visibleDetailRows.push(e), this.checkScrollbarVisibility();
    },
    hideDetailRow(e) {
      this.isVisibleDetailRow(e) && (this.visibleDetailRows.splice(
        this.visibleDetailRows.indexOf(e),
        1
      ), this.updateHeader());
    },
    toggleDetailRow(e) {
      this.isVisibleDetailRow(e) ? this.hideDetailRow(e) : this.showDetailRow(e);
    },
    showField(e) {
      e < 0 || e > this.tableFields.length || (this.tableFields[e].visible = !0);
    },
    hideField(e) {
      e < 0 || e > this.tableFields.length || (this.tableFields[e].visible = !1);
    },
    toggleField(e) {
      e < 0 || e > this.tableFields.length || (this.tableFields[e].visible = !this.tableFields[e].visible);
    },
    makePagination(e = null, t = null, s = null) {
      return e = e === null ? 0 : e, t = t === null ? this.perPage : t, s = s === null ? this.currentPage : s, {
        total: e,
        per_page: t,
        current_page: s,
        last_page: Math.ceil(e / t) || 0,
        next_page_url: "",
        prev_page_url: "",
        from: (s - 1) * t + 1,
        to: Math.min(s * t, e)
      };
    },
    normalizeSortOrder() {
      this.sortOrder.forEach((e) => {
        e.sortField = e.sortField || e.field;
      });
    },
    handleDataMode() {
      if (this.data !== null && Array.isArray(this.data)) {
        this.setData(this.data);
        return;
      }
      this.dataManager ? this.callDataManager() : this.setData(this.data);
    },
    callDataManager() {
      const e = this.dataManager(this.sortOrder, this.makePagination());
      this.isPromiseObject(e) ? e.then((t) => this.setData(t)) : this.setData(e);
    },
    isObject(e) {
      return typeof e == "object" && e !== null;
    },
    isPromiseObject(e) {
      return this.isObject(e) && typeof e.then == "function";
    },
    onRowClass(e, t) {
      return typeof this.rowClass == "function" ? this.rowClass(e, t) : this.rowClass;
    },
    onDetailRowClass(e, t) {
      return typeof this.detailRowClass == "function" ? this.detailRowClass(e, t) : this.detailRowClass;
    },
    onRowClicked(e, t, s) {
      return this.fireEvent("row-clicked", { data: e, index: t, event: s }), !0;
    },
    onRowDoubleClicked(e, t, s) {
      this.fireEvent("row-dblclicked", { data: e, index: t, event: s });
    },
    onDetailRowClick(e, t, s) {
      this.fireEvent("detail-row-clicked", { data: e, index: t, event: s });
    },
    onCellClicked(e, t, s, r) {
      this.fireEvent("cell-clicked", { data: e, index: t, field: s, event: r });
    },
    onCellDoubleClicked(e, t, s, r) {
      this.fireEvent("cell-dblclicked", { data: e, index: t, field: s, event: r });
    },
    onCellRightClicked(e, t, s, r) {
      this.fireEvent("cell-rightclicked", { data: e, index: t, field: s, event: r });
    },
    onMouseOver(e, t, s) {
      this.fireEvent("row-mouseover", { data: e, index: t, event: s });
    },
    onFieldEvent(e, t) {
      this.fireEvent("field-event", e, t, this);
    },
    onHeaderEvent(e, t) {
      this.fireEvent("header-event", e, t, this);
    },
    onCheckboxToggled(e, t, s) {
      let r = this.trackBy;
      if (s[r] === void 0) {
        this.warn('checkbox field: The "' + this.trackBy + '" field does not exist! Make sure the field you specify in "track-by" prop does exist.');
        return;
      }
      let d = s[r];
      e ? this.selectId(d) : this.unselectId(d), this.fireEvent("checkbox-toggled", e, t);
    },
    onCheckboxToggledAll(e) {
      let t = this.trackBy;
      e ? this.tableData.forEach((s) => {
        this.selectId(s[t]);
      }) : this.tableData.forEach((s) => {
        this.unselectId(s[t]);
      }), this.fireEvent("checkbox-toggled-all", e);
    },
    changePage(e) {
      e === "prev" ? this.gotoPreviousPage() : e === "next" ? this.gotoNextPage() : this.gotoPage(e);
    },
    reload() {
      return this.loadData();
    },
    refresh() {
      return this.currentPage = this.firstPage, this.loadData();
    },
    resetData() {
      this.tableData = null, this.tablePagination = null, this.fireEvent("data-reset");
    }
  }
}, de = {
  key: 0,
  class: "vuetable-head-wrapper"
}, he = { key: 0 }, ce = { class: "vuetable-body" }, be = ["item-index", "onClick", "onDblclick", "onMouseover"], ge = ["innerHTML", "onClick", "onDblclick", "onContextmenu"], fe = { key: 0 }, pe = ["colspan", "innerHTML"], me = { key: 0 };
function ve(e, t, s, r, d, a) {
  const h = $("vuetable-col-group");
  return i(), l("div", {
    class: u(d.$_css.tableWrapper)
  }, [
    a.isFixedHeader ? (i(), l("div", de, [
      g("table", {
        class: u(["vuetable", d.$_css.tableClass, d.$_css.tableHeaderClass])
      }, [
        F(h, { "is-header": !0 }),
        g("thead", null, [
          w(e.$slots, "tableHeader", { fields: d.tableFields }, () => [
            (i(!0), l(b, null, p(s.headerRows, (n, c) => (i(), y(C(n), {
              key: c,
              "onVuetable:headerEvent": a.onHeaderEvent
            }, null, 40, ["onVuetable:headerEvent"]))), 128))
          ])
        ])
      ], 2)
    ])) : f("", !0),
    g("div", {
      class: u(["vuetable-body-wrapper", { "fixed-header": a.isFixedHeader }]),
      style: m({ height: s.tableHeight })
    }, [
      g("table", {
        class: u(["vuetable", a.isFixedHeader ? "fixed-header" : "", d.$_css.tableClass, d.$_css.tableBodyClass])
      }, [
        F(h),
        a.isFixedHeader ? f("", !0) : (i(), l("thead", he, [
          w(e.$slots, "tableHeader", { fields: d.tableFields }, () => [
            (i(!0), l(b, null, p(s.headerRows, (n, c) => (i(), y(C(n), {
              key: c,
              "onVuetable:headerEvent": a.onHeaderEvent
            }, null, 40, ["onVuetable:headerEvent"]))), 128))
          ])
        ])),
        g("tfoot", null, [
          w(e.$slots, "tableFooter", { fields: d.tableFields })
        ]),
        g("tbody", ce, [
          (i(!0), l(b, null, p(d.tableData, (n, c) => (i(), l(b, { key: c }, [
            g("tr", {
              "item-index": c,
              class: u(a.onRowClass(n, c)),
              onClick: (o) => a.onRowClicked(n, c, o),
              onDblclick: (o) => a.onRowDoubleClicked(n, c, o),
              onMouseover: (o) => a.onMouseOver(n, c, o)
            }, [
              (i(!0), l(b, null, p(d.tableFields, (o, j) => (i(), l(b, { key: j }, [
                o.visible ? (i(), l(b, { key: 0 }, [
                  a.isFieldComponent(o.name) ? (i(), y(C(o.name), {
                    key: 0,
                    "row-data": n,
                    "row-index": c,
                    "row-field": o,
                    vuetable: a.vuetable,
                    class: u(a.bodyClass("vuetable-component", o)),
                    style: m({ width: o.width }),
                    "onVuetable:fieldEvent": a.onFieldEvent
                  }, null, 40, ["row-data", "row-index", "row-field", "vuetable", "class", "style", "onVuetable:fieldEvent"])) : a.isFieldSlot(o.name) ? (i(), l("td", {
                    key: 1,
                    class: u(a.bodyClass("vuetable-slot", o)),
                    style: m({ width: o.width })
                  }, [
                    w(e.$slots, o.name, {
                      rowData: n,
                      rowIndex: c,
                      rowField: o
                    })
                  ], 6)) : (i(), l("td", {
                    key: 2,
                    class: u(a.bodyClass("vuetable-td-" + o.name, o)),
                    style: m({ width: o.width }),
                    innerHTML: a.renderNormalField(o, n),
                    onClick: (P) => a.onCellClicked(n, c, o, P),
                    onDblclick: (P) => a.onCellDoubleClicked(n, c, o, P),
                    onContextmenu: (P) => a.onCellRightClicked(n, c, o, P)
                  }, null, 46, ge))
                ], 64)) : f("", !0)
              ], 64))), 128))
            ], 42, be),
            a.useDetailRow ? (i(), l(b, { key: 0 }, [
              a.isVisibleDetailRow(n[s.trackBy]) ? (i(), l(b, { key: 0 }, [
                (i(), y(C(s.detailRowComponent), {
                  "row-data": n,
                  "row-index": c,
                  options: s.detailRowOptions
                }, null, 8, ["row-data", "row-index", "options"])),
                (i(), y(C(s.comparisonRowComponent), {
                  "row-data": n,
                  "row-index": c,
                  options: s.detailRowOptions
                }, null, 8, ["row-data", "row-index", "options"]))
              ], 64)) : f("", !0)
            ], 64)) : f("", !0)
          ], 64))), 128)),
          a.displayEmptyDataRow ? (i(), l("tr", fe, [
            g("td", {
              colspan: a.countVisibleFields,
              class: "vuetable-empty-result",
              innerHTML: s.noDataTemplate
            }, null, 8, pe)
          ])) : f("", !0),
          a.lessThanMinRows ? (i(!0), l(b, { key: 1 }, p(a.blankRows, (n) => (i(), l("tr", {
            key: n,
            class: "blank-row"
          }, [
            (i(!0), l(b, null, p(d.tableFields, (c, o) => (i(), l(b, { key: o }, [
              c.visible ? (i(), l("td", me, "\xA0")) : f("", !0)
            ], 64))), 128))
          ]))), 128)) : f("", !0)
        ])
      ], 2)
    ], 6)
  ], 2);
}
const ye = /* @__PURE__ */ v(ue, [["render", ve]]), S = {
  props: {
    css: {
      type: Object,
      default() {
        return {};
      }
    },
    onEachSide: {
      type: Number,
      default() {
        return 2;
      }
    },
    firstPage: {
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {
      eventPrefix: "vuetable-pagination:",
      tablePagination: null,
      $_css: {}
    };
  },
  computed: {
    totalPage() {
      return this.tablePagination === null ? 0 : this.tablePagination.last_page - this.firstPage + 1;
    },
    lastPage() {
      return this.tablePagination === null ? 0 : this.tablePagination.last_page;
    },
    isOnFirstPage() {
      return this.tablePagination === null ? !1 : this.tablePagination.current_page === this.firstPage;
    },
    isOnLastPage() {
      return this.tablePagination === null ? !1 : this.tablePagination.current_page === this.lastPage;
    },
    notEnoughPages() {
      return this.totalPage < this.onEachSide * 2 + 4;
    },
    windowSize() {
      return this.onEachSide * 2 + 1;
    },
    windowStart() {
      return !this.tablePagination || this.tablePagination.current_page <= this.onEachSide ? 1 : this.tablePagination.current_page >= this.totalPage - this.onEachSide ? this.totalPage - this.onEachSide * 2 : this.tablePagination.current_page - this.onEachSide;
    }
  },
  created() {
    this.mergeCss();
  },
  methods: {
    mergeCss() {
      this.$_css = { ..._.pagination, ...this.css };
    },
    loadPage(e) {
      this.$emit(this.eventPrefix + "change-page", e);
    },
    isCurrentPage(e) {
      return e === this.tablePagination.current_page;
    },
    setPaginationData(e) {
      this.tablePagination = e;
    },
    resetData() {
      this.tablePagination = null;
    }
  }
}, M = {
  props: {
    css: {
      type: Object,
      default() {
        return {};
      }
    },
    infoTemplate: {
      type: String,
      default() {
        return "Displaying {from} to {to} of {total} items";
      }
    },
    noDataTemplate: {
      type: String,
      default() {
        return "No relevant data";
      }
    }
  },
  data: function() {
    return {
      tablePagination: null,
      $_css: {}
    };
  },
  computed: {
    paginationInfo() {
      return this.tablePagination == null || this.tablePagination.total == 0 ? this.noDataTemplate : this.infoTemplate.replace("{from}", this.tablePagination.from || 0).replace("{to}", this.tablePagination.to || 0).replace("{total}", this.tablePagination.total || 0);
    }
  },
  created() {
    this.mergeCss();
  },
  methods: {
    mergeCss() {
      this.$_css = { ..._.paginationInfo, ...this.css };
    },
    setPaginationData(e) {
      this.tablePagination = e;
    },
    resetData() {
      this.tablePagination = null;
    }
  }
};
const Ce = {
  mixins: [S]
}, Pe = { key: 1 }, we = { key: 1 }, ke = ["onClick", "innerHTML"], _e = ["onClick", "innerHTML"], Se = { key: 1 }, De = { key: 1 };
function Fe(e, t, s, r, d, a) {
  return L((i(), l("div", {
    class: u(e.$_css.wrapperClass)
  }, [
    g("a", {
      onClick: t[0] || (t[0] = (h) => e.loadPage(e.firstPage)),
      class: u(["btn-nav", e.$_css.linkClass, e.isOnFirstPage ? e.$_css.disabledClass : ""])
    }, [
      e.$_css.icons.first != "" ? (i(), l("i", {
        key: 0,
        class: u([e.$_css.icons.first])
      }, null, 2)) : (i(), l("span", Pe, "\xAB"))
    ], 2),
    g("a", {
      onClick: t[1] || (t[1] = (h) => e.loadPage("prev")),
      class: u(["btn-nav", e.$_css.linkClass, e.isOnFirstPage ? e.$_css.disabledClass : ""])
    }, [
      e.$_css.icons.next != "" ? (i(), l("i", {
        key: 0,
        class: u([e.$_css.icons.prev])
      }, null, 2)) : (i(), l("span", we, "\xA0\u2039"))
    ], 2),
    e.notEnoughPages ? (i(!0), l(b, { key: 0 }, p(e.totalPage, (h, n) => (i(), l("a", {
      key: n,
      onClick: (c) => e.loadPage(n + e.firstPage),
      class: u([e.$_css.pageClass, e.isCurrentPage(n + e.firstPage) ? e.$_css.activeClass : ""]),
      innerHTML: h
    }, null, 10, ke))), 128)) : (i(!0), l(b, { key: 1 }, p(e.windowSize, (h, n) => (i(), l("a", {
      key: n,
      onClick: (c) => e.loadPage(e.windowStart + n + e.firstPage - 1),
      class: u([e.$_css.pageClass, e.isCurrentPage(e.windowStart + n + e.firstPage - 1) ? e.$_css.activeClass : ""]),
      innerHTML: e.windowStart + h - 1
    }, null, 10, _e))), 128)),
    g("a", {
      onClick: t[2] || (t[2] = (h) => e.loadPage("next")),
      class: u(["btn-nav", e.$_css.linkClass, e.isOnLastPage ? e.$_css.disabledClass : ""])
    }, [
      e.$_css.icons.next != "" ? (i(), l("i", {
        key: 0,
        class: u([e.$_css.icons.next])
      }, null, 2)) : (i(), l("span", Se, "\u203A\xA0"))
    ], 2),
    g("a", {
      onClick: t[3] || (t[3] = (h) => e.loadPage(e.lastPage)),
      class: u(["btn-nav", e.$_css.linkClass, e.isOnLastPage ? e.$_css.disabledClass : ""])
    }, [
      e.$_css.icons.last != "" ? (i(), l("i", {
        key: 0,
        class: u([e.$_css.icons.last])
      }, null, 2)) : (i(), l("span", De, "\xBB"))
    ], 2)
  ], 2)), [
    [B, e.tablePagination && e.lastPage > e.firstPage]
  ]);
}
const Oe = /* @__PURE__ */ v(Ce, [["render", Fe]]), $e = {
  mixins: [S],
  props: {
    pageText: {
      type: String,
      default() {
        return "Page";
      }
    }
  },
  methods: {
    registerEvents() {
      this.$on("vuetable:pagination-data", (e) => {
        this.setPaginationData(e);
      });
    }
  },
  created() {
    this.registerEvents();
  }
}, Ee = ["value", "selected"];
function Ve(e, t, s, r, d, a) {
  return i(), l("div", {
    class: u([e.$_css.wrapperClass])
  }, [
    g("a", {
      onClick: t[0] || (t[0] = (h) => e.loadPage("prev")),
      class: u([e.$_css.linkClass, { [e.$_css.disabledClass]: e.isOnFirstPage }])
    }, [
      g("i", {
        class: u(e.$_css.icons.prev)
      }, null, 2)
    ], 2),
    g("select", {
      class: u(["vuetable-pagination-dropdown", e.$_css.dropdownClass]),
      onChange: t[1] || (t[1] = (h) => e.loadPage(h.target.selectedIndex + e.firstPage))
    }, [
      (i(!0), l(b, null, p(e.totalPage, (h, n) => (i(), l("option", {
        key: h,
        class: u([e.$_css.pageClass]),
        value: n + e.firstPage,
        selected: e.isCurrentPage(n + e.firstPage)
      }, O(s.pageText) + " " + O(h), 11, Ee))), 128))
    ], 34),
    g("a", {
      onClick: t[2] || (t[2] = (h) => e.loadPage("next")),
      class: u([e.$_css.linkClass, { [e.$_css.disabledClass]: e.isOnLastPage }])
    }, [
      g("i", {
        class: u(e.$_css.icons.next)
      }, null, 2)
    ], 2)
  ], 2);
}
const Te = /* @__PURE__ */ v($e, [["render", Ve]]);
const Re = {
  mixins: [M]
}, He = ["innerHTML"];
function Ie(e, t, s, r, d, a) {
  return i(), l("div", {
    class: u(["vuetable-pagination-info", e.$_css.infoClass]),
    innerHTML: e.paginationInfo
  }, null, 10, He);
}
const Me = /* @__PURE__ */ v(Re, [["render", Ie]]), Be = {
  VuetableFieldMixin: k,
  VuetableFieldCheckboxMixin: E,
  VuetablePaginationMixin: S,
  VuetablePaginationInfoMixin: M,
  install(e, t) {
    e.component("Vuetable", ye), e.component("VuetablePagination", Oe), e.component("VuetablePaginationDropDown", Te), e.component("VuetablePaginationInfo", Me), e.component("VuetableFieldCheckbox", V), e.component("VuetableFieldHandle", T), e.component("VuetableRowHeader", I), e.component("VuetableColGutter", H), e.component("VuetableFieldSequence", R);
  }
};
export {
  Be as default
};
