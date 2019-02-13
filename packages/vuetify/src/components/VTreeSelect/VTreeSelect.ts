import VSelect from '../VSelect/VSelect'
import treeselectable from './mixins/treeselectable'

export default VSelect.extend({
  name: 'v-tree-select',
  mixins: [treeselectable]
})
