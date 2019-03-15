/*eslint-disable*/
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { anyTypeAnnotation } from 'babel-types';

export interface Command {
    text: string
    icon?: string
    action: string
    isActionAvailible: boolean | Function
    submenu?: Command[]
}
// const ContexMenu = Vue.extend({
//     name: 'context-menu-component',
//     render(): VNode {
//         return this.$createElement('span','sdfsfsd')
//     }
// })
export default Vue.extend({
    name: 'context-menu',
    props: {
      commands: {
        type: Array,
        default: () => ([])
      } as PropValidator<Command[]>
    },
    data: () => ({
        isContextMenuActive: false,
        compiledMenu: null as any
    }),
    computed: {
        hasCommands(): boolean {
            return this.commands && this.commands.length > 0
        },
        isCommonContextMenuExists(): boolean {
            return Boolean(document.getElementById('common-context-menu'))
        },
        contextMenuTemplate(): string {
            return `
            <div class="text-xs-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    dark
                    v-on="on"
                  >
                    Dropdown
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in commands"
                    :key="index"
                    @click=""
                  >
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            `
        }
    },
    mounted () {
      if (this.hasCommands) {
        this.$el.addEventListener('contextmenu', this.genContextMenu)
        if (!this.isCommonContextMenuExists) {
            const el = document.createElement('div')
            el.id = 'common-context-menu'
            el.style.display = 'none'
            const firstDiv = document.getElementsByTagName('div').item(0)
            if (firstDiv) {
                console.log('insert div contextmenu')
                firstDiv.appendChild(el)
            }
        }
      }
    },
    methods: {
        genContextMenu(e: Event) {
            e.preventDefault()
            // const el = document.getElementById('common-context-menu')
            // const cm =  this.$createElement('span','fsadfsd')
            // const cc = Vue.extend({
            //     name: 'context-menu-local',
            //     render() {
            //         return this.$createElement('span','rrrrrrrr')
            //     }
            // })
            this.compiledMenu = Vue.compile(this.contextMenuTemplate)
            this.$options.staticRenderFns = this.compiledMenu.staticRenderFns
            // const w = ff.render(this.$createElement('span','ttttttt'))
            // w.
            //.component.call()
            // if (el && el.firstElementChild) {
            //     el.removeChild(el.firstElementChild)
            // }
            // if (el) {
            //     el.style.display = 'block'
            //     el.style.position = 'absolute'
            //     el.style.zIndex = '999'
            //     el.style.top =  '0'
            //     el.style.left = '0'
            //     el.style.margin =  '0'
            //     el.style.padding ='0'

            //     /* context menu content */
            //     const menu = document.createElement('span')
            //     menu.innerText = 'fsfsdfddddddddddd'
            //     menu.style.display = 'block'
            //     if (e instanceof MouseEvent) {
            //         el.style.top = `${e.y}px`
            //         el.style.left = `${e.x}px`
            //     }
            //     el.appendChild(menu)
            // }

            
        }
    }
    // render(h): VNode {
    //     return this.$createElement('span','fsadfs****d')
    // }
})

