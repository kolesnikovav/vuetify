/*eslint-disable*/
import Vue from 'vue'
import { PropValidator } from 'vue/types/options'

// Types
type CommandArrayOrFunc = PropValidator<Command[] | (() => Command[])>

export interface Command {
    text: string
    icon?: string
    action: string | Function
    canExecute: boolean | Function
    submenu?: Command[] | (() => Command[]),
    container?: any,
    target?:any
}

export default Vue.extend({
  name: 'context-menu',
  props: {
    commands: {
      type: [ Array, Function],
      default: () => ([])
    } as CommandArrayOrFunc
  },
  data: () => ({
    isContextMenuActive: false,
    compiledMenu: null as any
  }),
  computed: {
    computedCommands (): Command[] {
      if (this.commands instanceof Array) return this.commands
      const cmd = this.commands()
      return cmd
    },
    hasCommands (): boolean {
      return this.computedCommands && this.computedCommands.length > 0
    }
  },
  mounted () {
    if (this.hasCommands) {
      this.$el.addEventListener('contextmenu', this.genContextMenu)
    }
  },
  methods: {
    genContextMenu (e: Event) {
      e.preventDefault()
      this.$root.$emit('context-menu-call', { event: e, commands: this.computedCommands })
    }
  }
})

