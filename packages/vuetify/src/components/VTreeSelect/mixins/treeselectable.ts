import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { FilterTreeItemFunction } from '../../VTreeview/util/filterTreeItems'
import { consoleError } from '../../../util/console'
import VTreeSelectList from '../VTreeSelectList'
import { defaultMenuProps } from '../../VSelect/VSelect'
import { getPropertyFromItem } from '../../../util/helpers'
import VTextField from '../../VTextField/VTextField'

type NodeArray = (string | number)[]

export default Vue.extend({
  name: 'treeselectable',

  props: {
    color: VTextField.options.props.color,
    /* VSelect props */
    appendIcon: {
      type: String,
      default: '$vuetify.icons.dropdown'
    },
    noDataText: {
      type: String,
      default: 'No Data availible'
    },
    appendIconCb: Function,
    attach: {
      type: Boolean,
      default: false
    },
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    deletableChips: Boolean,
    dense: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    itemAvatar: {
      type: [String, Array, Function],
      default: 'avatar'
    },
    itemDisabled: {
      type: [String, Array, Function],
      default: 'disabled'
    },
    itemText: {
      type: String,
      default: 'name'
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'name'
    },
    menuProps: {
      type: [String, Array, Object],
      default: () => defaultMenuProps
    },
    multiple: Boolean,
    openOnClear: Boolean,
    returnObject: Boolean,
    searchInput: {
      default: null
    },
    smallChips: Boolean,
    /* VTreeView props */
    filter: Function as PropValidator<FilterTreeItemFunction>,
    open: {
      type: Array,
      default: () => ([])
    } as PropValidator<NodeArray>,
    openAll: Boolean
  },
  data: () => ({
    attrsInput: { role: 'combobox' },
    content: null,
    isBooted: false,
    isMenuActive: false,
    selectedIndex: -1,
    selectedItems: []
  }),
  computed: {
    listData (): any {
      const scopeId: any = null
      return {
        attrs: scopeId ? {
          [scopeId]: true
        } : null,
        props: {
          color: this.color,
          dense: this.dense,
          hideSelected: this.hideSelected,
          items: this.items,
          noDataText: this.$vuetify.t(this.noDataText),
          selectedItems: this.selectedItems,
          itemAvatar: this.itemAvatar,
          itemDisabled: this.itemDisabled,
          itemValue: this.itemValue,
          itemText: this.itemText
        },
        on: {
          select: this.selectItems
        },
        scopedSlots: {
          item: this.$scopedSlots.item
        }
      }
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      return this.$createElement(VTreeSelectList, this.listData)
    }
  },
  methods: {
    selectItems (items: []) {
      this.selectedItems = items
      if (!this.multiple) {
        this.isMenuActive = false
      }
    },
    getText (item: object) {
      return getPropertyFromItem(item, this.itemText as string)
    }
  }
})
