// Utils
import mixins from '../../util/mixins'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Mixins
import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'

export default mixins(
    RegistrableProvide('treeselectlist'),
    Themeable, Colorable
    /* @vue/component */
  ).extend({
    name: 'v-tree-select-list',

    provide (): object {
      return { treeselectlist: this }
    }
})
