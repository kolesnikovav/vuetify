import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
// Utils
import mixins from '../../util/mixins'
import { VListTile, VListTileContent, VListTileTitle, VList } from '../VList'
// import { provide as RegistrableProvide } from '../../mixins/registrable'

// Mixins
import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'
import VTreeview from '../VTreeview/VTreeview'
import VTreeviewNode, { VTreeviewNodeProps } from '../VTreeview/VTreeviewNode'
import {
  FilterTreeItemFunction
} from '../VTreeview/util/filterTreeItems'

type NodeArray = (string | number)[]

export default mixins(
//  RegistrableProvide('treeselectlist'),
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-tree-select-list',
  props: {
    noDataText: String,
    dense: Boolean,
    multiple: Boolean,
    items: {
      type: Array,
      default: () => ([])
    } as PropValidator<any[]>,
    openAll: Boolean,
    returnObject: {
      type: Boolean,
      default: false // TODO: Should be true in next major
    },
    value: {
      type: Array,
      default: () => ([])
    } as PropValidator<NodeArray>,
    search: String,
    filter: Function as PropValidator<FilterTreeItemFunction>,
    ...VTreeviewNodeProps
  },
  computed: {
    staticNoDataTile (): VNode {
      const tile = {
        on: {
          mousedown: (e: any) => e.preventDefault() // Prevent onBlur from being called
        }
      }
      return this.$createElement(VListTile, tile, [
        this.genTileNoDataContent()
      ])
    }
  },
  methods: {
    genTileNoDataContent (): VNode {
      const innerHTML = this.noDataText
      return this.$createElement(VListTileContent,
        [this.$createElement(VListTileTitle, {
          domProps: { innerHTML }
        })]
      )
    }
  },
  render (h): VNode {
    const children = []
    if (!this.items || !Array.isArray(this.items) || (this.items as []).length < 1) {
      children.length || children.push(this.$slots['no-data'] || this.staticNoDataTile)
      this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])

      this.$slots['append-item'] && children.push(this.$slots['append-item'])

      return this.$createElement('div', {
        staticClass: 'v-select-list v-card',
        'class': this.themeClasses
      }, [
        this.$createElement(VList, {
          props: {
            dense: this.dense
          }
        }, children)
      ])
    }
    return this.$createElement(VTreeview, {
      staticClass: 'v-select-list v-card',
      ref: 'menu',
      props: {
        items: this.items,
        selectable: true,
        returnObject: true,
        selectOnly: true
      },
      on: {
        input: (e: any) => {
          this.$emit('select', e)
        }
      }
    })
  }
})
