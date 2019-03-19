/*eslint-disable*/
import Vue, { VNode } from 'vue'
import VMenu from '../VMenu/VMenu'
import VList from '../VList/VList'
import { Command } from '../../mixins/contextmenu'
import VListTile from '../VList/VListTile'
import VIcon from '../VIcon'
import VDivider from '../VDivider/VDivider'

interface MenuItemsMap {
  [id: string]: Command
}

export default Vue.extend({
  name: 'context-menu',
  data: () => ({
    isContextMenuActive: false,
    commands: ([] as Command[]),
    positionX: 0,
    positionY: 0,
    positionXSubmenu: 0,
    positionYSubmenu: 0,
    menuItemsMap: ({} as MenuItemsMap)
  }),
  mounted () {
    this.$root.$on('context-menu-call', this.activateContextMenu)
  },
  methods: {
    genTileText (text: string): VNode {
      return this.$createElement('div',{
        staticClass: 'v-list__tile__title',
        domProps: {
          innerText: text
        }
      })
    },
     genContextMenuItem (cmd: Command, indexes: any): VNode[] {
      indexes.submenuIndex++
      const children: VNode[] = []
      const title = this.genTileText(cmd.text)
      const divider = this.$createElement(VDivider)
      children.push(title)
      if (cmd.icon) {
        children.push(this.$createElement(VIcon, cmd.icon))
      }
      if (cmd.submenu) {
        children.push(this.$createElement(VIcon,'$vuetify.icons.subgroup'))
      }
      if (!cmd.submenu) {
        const cMenuRef = 'CMenuItem'+ indexes.itemindex
        indexes.itemindex++
        indexes.menuItemsMap[cMenuRef] = cmd
        return [this.$createElement(VListTile, {
          ref: cMenuRef,
          props: {
            title: cmd.text,
          },
          on: {
            click: (e: Event) => {
              e.stopPropagation()
              e.preventDefault()
              this.executeAction(e, cMenuRef)
              this.deactivateContextMenu()
            },
            contextmenu: (e: Event) => {
              e.preventDefault()
              e.stopPropagation()
            }
          }
        }, children), divider]
      } else {
        const cmdSub = cmd.submenu instanceof Array ? cmd.submenu : cmd.submenu()
        const submenuItems: VNode[] = []
        cmdSub.forEach(cmdSub => {
          const subm = this.genContextMenuItem(cmdSub, indexes)
          submenuItems.push(...subm)
        })
        const submenuContent = this.$createElement(VList,{
          ref: 'content'
        },submenuItems)

        const submenuTile = this.$createElement(VListTile, {
          ref: 'activator' + indexes.submenuIndex,
          props: {
            title: cmd.text
          },
          on: {
            click: (e: Event) => {
              e.stopPropagation()
              this.activateSubmenu('submenu' + indexes.submenuIndex, e)
            },
            contextmenu: (e: Event) => {
              e.preventDefault()
            }
          }
        }, children)
        return [submenuTile, this.$createElement(VMenu, {
          ref: 'submenu' + indexes.submenuIndex,
          props: {
            absolute: true,
            positionX: this.positionXSubmenu,
            positionY: this.positionYSubmenu
          }
        }, [submenuContent])]
      }
    },
    genContextMenu (): VNode {
      this.menuItemsMap =  ({} as MenuItemsMap)
      let idxMenu = {
        submenuIndex: 0,
        itemindex: 0,
        menuItemsMap: ({} as MenuItemsMap)
      }
      const children: VNode[] = []
      const datacmd = this.$data.commands as Command[]
      datacmd.forEach(cmd => {
        const chItem = this.genContextMenuItem(cmd, idxMenu )
        children.push(...chItem)
      })
      this.menuItemsMap = idxMenu.menuItemsMap;
      return this.$createElement(VList, {
        ref: 'content'
      }, children)
    },
    activateSubmenu ( refSub: string, e: Event) {
      if (e instanceof MouseEvent) {
        this.positionXSubmenu = e.clientX + 2;
        this.positionYSubmenu = e.clientY + 2
      }
      (this.$refs[refSub] as any).$data.isActive = true
    },
    activateContextMenu (e: any) {
      this.commands = e.commands
      this.isContextMenuActive = true
      if (e.event instanceof MouseEvent) {
          this.positionX = e.event.x
          this.positionY = e.event.y
      }
      (this.$refs.contextmenu as any).$data.isActive = true;
      (e.event as Event).stopPropagation()
    },
    deactivateContextMenu () {
      (this.$refs.contextmenu as any).$data.isActive = false;
    },    
    executeAction (e: any, c: string) {
      const cmd = this.menuItemsMap[c]
      if (typeof cmd.action === 'string') {
        cmd.container[cmd.action]()
      }
    },
  },
  render (h): VNode {
    return h(VMenu, {
      ref: 'contextmenu',
      props: {
        absolute: true,
        positionX: this.positionX,
        positionY: this.positionY,
        isActive: this.isContextMenuActive
      },
      on: {
        contextmenu: (e: Event) => {
          e.preventDefault()
        }
      }
    }, [this.genContextMenu()])
  }
})

