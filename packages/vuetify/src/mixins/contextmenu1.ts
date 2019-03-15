// /*eslint-disable*/
// import menuable from './menuable'
// import { VNode } from 'vue'
// import { PropValidator } from 'vue/types/options'
// import VMenu from '../components/VMenu/VMenu'
// import { VList, VListTile } from '../components/VList'
// //import ThemeProvider from '../util/ThemeProvider'

// /*-- eslint-disable object-property-newline */
// const dimensions = {
//     activator: {
//       top: 0, left: 0,
//       bottom: 0, right: 0,
//       width: 0, height: 0,
//       offsetTop: 0, scrollHeight: 0
//     },
//     content: {
//       top: 0, left: 0,
//       bottom: 0, right: 0,
//       width: 0, height: 0,
//       offsetTop: 0, scrollHeight: 0
//     },
//     hasWindow: false
//   }
// /* eslint-enable object-property-newline */

// export interface Command {
//     text: string
//     icon?: string
//     action: string
//     isActionAvailible: boolean | Function
//     submenu?: Command[]
// }  

// export default menuable.extend({
//     name: 'context-menu',
//     props: {
//       commands: {
//         type: Array,
//         default: () => ([])
//       } as PropValidator<Command[]>,
//       auto: Boolean,
//       closeOnClick: {
//         type: Boolean,
//         default: true
//       },
//       closeOnContentClick: {
//         type: Boolean,
//         default: true
//       },
//       disabled: Boolean,
//       fullWidth: Boolean,
//       maxHeight: { default: 'auto' },
//       openOnClick: {
//         type: Boolean,
//         default: true
//       },
//       offsetX: Boolean,
//       offsetY: Boolean,
//       openOnHover: Boolean,
//       origin: {
//         type: String,
//         default: 'top left'
//       },
//       transition: {
//         type: [Boolean, String],
//         default: 'v-menu-transition'
//       },
//       ...menuable.options.props,
//     },
//     data: () => ({
//         absoluteX: 0,
//         absoluteY: 0,
//         dimensions: Object.assign({}, dimensions),
//         isContentActive: false,
//         pageWidth: 0,
//         pageYOffset: 0,
//         stackClass: 'v-menu__content--active',
//         stackMinZIndex: 6,
//         defaultOffset: 8,
//         hasJustFocused: false,
//         resizeTimeout: null,
//         isContextMenuActive: false
//     }),
//     computed: {
//         hasCommands(): boolean {
//             return this.commands && this.commands.length > 0
//         },
//         calculatedLeft (): string {
//             return VMenu.options.computed.calculatedLeft.call(this)
//         },
//         calculatedMaxHeight () {
//             return VMenu.options.computed.calculatedMaxHeight.call(this)
//         },
//         calculatedMaxWidth () {
//             return VMenu.options.computed.calculatedMaxWidth.call(this)
//         },
//         calculatedMinWidth () {
//             return VMenu.options.computed.calculatedMinWidth.call(this)
//         },
//         calculatedTop () {
//             return VMenu.options.computed.calculatedTop.call(this)
//         },
//         styles () {
//           const s = VMenu.options.computed.styles.call(this)
//           s.zIndex = 999
//           return s
//             // return {
//             //   maxHeight: this.calculatedMaxHeight,
//             //   minWidth: this.calculatedMinWidth,
//             //   maxWidth: this.calculatedMaxWidth,
//             //   top: this.calculatedTop,
//             //   left: this.calculatedLeft,
//             //   transformOrigin: this.origin,
//             //   zIndex: this.zIndex || this.activeZIndex
//             // }            
//         }
//     },
//     mounted () {
//       if (this.hasCommands) {
//         this.$el.addEventListener('contextmenu', this.genContextMenu)
//       }
//     },
//     methods: {
//         genContextMenu(e: Event) {
//             e.preventDefault()
//             const q = this.$createElement('span','77777')
//             console.log(q.text)
//             if (q) {
//               const qw: VNode[] = [q]
//               this.$slots['context'] = qw
//             }
            
            
//             // const qq = q.componentInstance
//             // if (qq) {
//             //   //const qqq = qq.$el
//             // }
            


//             const el = document.createElement('contextmenu')
//             const ee = document.createElement('ul')
//             const ee1 = document.createElement('li')
//             ee1.innerText = "787878787"
//             ee.appendChild(ee1)
//             el.appendChild(ee)
//             // // el.innerText = 'gsdfgsdfsd'
//             //  el.id = 'contextmenu'
//             // // // this.$children cannot be used because it expects a VNode :(
//             // //   if (!this.$el.contains(el)) {
//             this.$el.append(el)
//             //      el.oncontextmenu
//             // //   }
                        
//             // this.$el.appendChild(this.$createElement('span','dasdasd').context)
//             //   this.$nextTick()
            
// /*             //this.updateDimensions()
//             if ( e instanceof MouseEvent) {
//                 this.dimensions.activator.left = e.clientX
//                 this.dimensions.activator.top = e.clientY
//                 this.dimensions.activator.height = 200
//                 this.dimensions.activator.width = 200

//                 this.dimensions.content.left = e.clientX
//                 this.dimensions.content.top = e.clientY
//                 this.dimensions.content.height = 200
//                 this.dimensions.content.width = 200
//             }
            
//             //alert('csdsafsd')
//             const data = {
//                 staticClass: 'v-menu',
//                 class: { 'v-menu--inline': !this.fullWidth && this.$slots.activator },
//                 // directives: [{
//                 //   arg: 500,
//                 //   name: 'resize',
//                 //   value: this.onResize
//                 // }],
//                 // on: this.disableKeys ? undefined : {
//                 //   keydown: this.onKeyDown
//                 // }
//               }
//               // const mItems: VNode[] = []
//               // this.commands.forEach(cmd => {
//               //   mItems.push(this.$createElement(VListTile, {}, cmd.text))
//               // })
//               // // //return this.$createElement(VList, options, [mItems])
//               // return this.$createElement('div', {
//               //   staticClass: 'v-select-list v-card',
//               //   'class': (this as any).rootThemeClasses
//               // }, [
//               //   this.$createElement(VList, {
//               //     props: {
//               //       //dense: this.dense
//               //     }
//               //   }, mItems)
//               // ])      
//               this.$nextTick(() => {
//             this.$createElement('div', data, [
//                 this.$createElement(ThemeProvider, {
//                   props: {
//                     root: true,
//                     light: this.light,
//                     dark: this.dark
//                   }
//                 }, [this.genTransition()])
//               ])
//             })
//             //   // this.dimensions.content = cm */

//         },
//         genTransition() {
//             if (!this.transition) return this.genContextMenuContent()

//             return this.$createElement('transition', {
//                 props: {
//                     name: this.transition
//                 }
//             }, [this.genContextMenuContent()])
//         },
//     genContextMenuContent (): VNode {
//       const mItems: VNode[] = []
//       const options = {
//         staticClass: 'v-menu__content',
//          'class': {
//           ...(this as any).rootThemeClasses,
//             'v-menu__content--auto': this.auto
//             //'menuable__content__active': this.isActive
//             // [(this as any).contentClass.trim()]: true
//           },
//           style: this.styles,
//           // directives: this.genDirectives(),
//           ref: 'content',
//           on: {
//             click: (e: any) => {
//               e.stopPropagation()
//               if (e.target.getAttribute('disabled')) return
//               if ((this as any).closeOnContentClick) this.isContextMenuActive = false
//             }
//           }
//       }
//       this.commands.forEach(cmd => {
//         mItems.push(this.$createElement(VListTile, options, cmd.text))
//       })
//       return this.$createElement(VList, options, mItems)
//       // return this.$createElement('div', {
//       //   staticClass: 'v-select-list v-card',
//       //   'class': (this as any).rootThemeClasses
//       // }, [
//       //   this.$createElement(VList, {
//       //     props: {
//       //       //dense: this.dense
//       //     }
//       //   }, mItems)
//       // ])      
//     },
//     }
// })

// // import Vue, { VNode, VNodeChildren } from 'vue'
// // import { PropValidator } from 'vue/types/options'
// // import bootable from './bootable'
// // import Themeable from './themeable'
// // import VMenu from '../components/VMenu/VMenu'
// // import { VList, VListTile } from '../components/VList'
// // import ThemeProvider from '../util/ThemeProvider'

// // export interface Command {
// //     text: string
// //     icon?: string
// //     action: string
// //     isActionAvailible: boolean | Function
// //     submenu?: Command[]
// // }

// // export default Vue.extend({
// //   name: 'context-menu',
// //   mixins: [bootable,Themeable],
// //   props: {
// //     commands: {
// //         type: Array,
// //         default: () => ([])
// //       } as PropValidator<Command[]>,
// //     light: Boolean,
// //     dark: Boolean,
// //     contextMenuTransition: {
// //       type: [Boolean, String],
// //       default: 'v-menu-transition'
// //     }
// //   },
// //   data: () => ({
// //     isContextMenuActive: false,
// //     isActive: false,
// //     auto: true,
// //     closeOnClick: true,
// //     closeOnContentClick: true,
// //     disabled: false,
// //     fullWidth: false,
// //     maxHeight: 'auto',
// //     openOnClick: true,
// //     offsetX: false,
// //     offsetY: false,
// //     openOnHover: false,
// //     origin: 'top left',
    
// //   }),
// //   computed: {
// //     hasCommands (): boolean {
// //       return this.commands && this.commands.length > 0
// //     },
// //     styles () {
// //         return VMenu.options.computed.styles.call(this)
// //     }
// //   },
// //   mounted () {
// //     if (this.hasCommands) {
// //       this.$el.addEventListener('contextmenu', this.genContextMenu)
// //     }
// //   },
// //   methods: {
// //     updateDimensions () {
// //         // this.checkForWindow()
// //         // this.checkForPageYOffset()
// //         this.pageWidth = document.documentElement.clientWidth
  
// //         const dimensions = {}
  
// //         // Activator should already be shown
// //         if (!this.hasActivator || this.absolute) {
// //           dimensions.activator = this.absolutePosition()
// //         } else {
// //           const activator = this.getActivator()
// //           dimensions.activator = this.measure(activator)
// //           dimensions.activator.offsetLeft = activator.offsetLeft
// //           if (this.isAttached) {
// //             // account for css padding causing things to not line up
// //             // this is mostly for v-autocomplete, hopefully it won't break anything
// //             dimensions.activator.offsetTop = activator.offsetTop
// //           } else {
// //             dimensions.activator.offsetTop = 0
// //           }
// //         }
  
// //         // Display and hide to get dimensions
// //         this.sneakPeek(() => {
// //           dimensions.content = this.measure(this.$refs.content)
  
// //           this.dimensions = dimensions
// //         })
// //     },
// //     activate (t: any, e: Event) {
// //         // This exists primarily for v-select
// //         // helps determine which tiles to activate
// //         //this.getTiles()
// //         // Update coordinates and dimensions of menu
// //         // and its activator
// //         //VMenu.options.methods.updateDimensions.call(e.target)
// //         //this.updateDimensions()
// //         // Start the transition
// //         requestAnimationFrame(() => {
// //           // Once transitioning, calculate scroll and top position
// //         //   this.startTransition().then(() => {
// //         //     if (this.$refs.content) {
// //         //       this.calculatedTopAuto = this.calcTopAuto()
// //         //       this.auto && (this.$refs.content.scrollTop = this.calcScrollPosition())
// //         //     }
// //         //   })
// //         })
// //       },
// //     genContextMenu (e: Event) {
// //         e.preventDefault()
// //         const data = {
// //           staticClass: 'v-menu',
// //           class: { 'v-menu--inline': true }
// //         //   directives: [{
// //         //     arg: 500,
// //         //     name: 'resize',
// //         //     value: this.onResize
// //         //   }],
// //         //   on: this.disableKeys ? undefined : {
// //         //     keydown: this.onKeyDown
// //         //   }
// //         }
// //         const t =  this.$createElement('div', data, [
// //           this.$createElement(ThemeProvider, {
// //             props: {
// //               root: true,
// //               light: this.light,
// //               dark: this.dark
// //             }
// //           }, [this.genTransition()])
// //         ])
// //         this.activate(t,e)
// //         //VMenu.options.methods.activate.call(t)
// //     },
// //     genTransition (): VNode {
// //         if (!this.contextMenuTransition) return this.genContextMenuContent(this.commands)
// //         return this.$createElement('transition', {
// //           props: {
// //             name: this.contextMenuTransition
// //           }
// //         }, [this.genContextMenuContent(this.commands)])
// //     },
// //     genContextMenuContent (menucommands: Command[]): VNode {
// //       const mItems: VNodeChildren = []
// //       const options = {
// //         staticClass: 'v-menu__content',
// //          'class': {
// //           ...(this as any).rootThemeClasses,
// //             'v-menu__content--auto': this.auto
// //             //'menuable__content__active': this.isActive
// //             // [(this as any).contentClass.trim()]: true
// //           },
// //           style: this.styles,
// //           // directives: this.genDirectives(),
// //           ref: 'content',
// //           on: {
// //             click: (e: any) => {
// //               e.stopPropagation()
// //               if (e.target.getAttribute('disabled')) return
// //               if ((this as any).closeOnContentClick) this.isContextMenuActive = false
// //             }
// //           }
// //       }
// //       menucommands.forEach(cmd => {
// //         mItems.push(this.$createElement(VListTile, options, cmd.text))
// //       })
// //       return this.$createElement(VList, options, [mItems])
// //     },
// //   }  

// // })


// // // import Vue, { VNodeChildren, VNode } from 'vue'
// // // import { PropValidator } from 'vue/types/options'
// // // import { VMenu } from '../components/VMenu'
// // // import ThemeProvider from '../util/ThemeProvider'
// // // import { VList, VListTile } from '../components/VList'
// // // import bootable from './bootable'
// // // import Themeable from './themeable'

// // // import mixins from '../util/mixins'

// // // interface options extends Vue {
// // //   $el: HTMLElement
// // //   $refs: {
// // //     content: HTMLElement
// // //   }
// // // }

// // // export interface Command {
// // //     text: string
// // //     icon?: string
// // //     action: string
// // //     isActionAvailible: boolean | Function
// // //     submenu?: Command[]
// // // }

// // // export default Vue.extend({
// // //   name: 'context-menu',
// // //   mixins: [bootable,Themeable],
// // //   props: {
// // //     commands: {
// // //         type: Array,
// // //         default: () => ([])
// // //       } as PropValidator<Command[]>,
// // //     light: Boolean,
// // //     dark: Boolean,
// // //     contextMenuTransition: {
// // //       type: [Boolean, String],
// // //       default: 'v-menu-transition'
// // //     }
// // //   },
// // // //   data: () => ({
// // // //     isContextMenuActive: false,
// // // //     auto: true,
// // // //     closeOnClick: true,
// // // //     closeOnContentClick: true,
// // // //     disabled: false,
// // // //     fullWidth: false,
// // // //     maxHeight: 'auto',
// // // //     openOnClick: true,
// // // //     offsetX: false,
// // // //     offsetY: false,
// // // //     openOnHover: false,
// // // //     origin: 'top left'
// // // //   }),
// // //   computed: {
// // //     hasCommands (): boolean {
// // //       return this.commands && this.commands.length > 0
// // //     },
// // //     styles () {
// // //         return VMenu.options.computed.styles.call(this)
// // //   },
// // //   mounted () {
// // //     if (this.hasCommands) {
// // //       this.$el.addEventListener('contextmenu', this.genContextMenu)
// // //     }
// // //   },
// // //   methods: {
// // //     genContextMenu (e: Event): VNode {
// // //         e.preventDefault()
// // //         const data = {
// // //           staticClass: 'v-menu',
// // //           class: { 'v-menu--inline': true }
// // //         //   directives: [{
// // //         //     arg: 500,
// // //         //     name: 'resize',
// // //         //     value: this.onResize
// // //         //   }],
// // //         //   on: this.disableKeys ? undefined : {
// // //         //     keydown: this.onKeyDown
// // //         //   }
// // //         }
// // //         return this.$createElement('div', data, [
// // //           this.$createElement(ThemeProvider, {
// // //             props: {
// // //               root: true,
// // //               light: this.light,
// // //               dark: this.dark
// // //             }
// // //           }, [this.genTransition()])
// // //         ])
// // //     },
// // //     genTransition (): VNode {
// // //         if (!this.contextMenuTransition) return this.genContextMenuContent(this.commands)
// // //         return this.$createElement('transition', {
// // //           props: {
// // //             name: this.contextMenuTransition
// // //           }
// // //         }, [this.genContextMenuContent(this.commands)])
// // //     },
// // //     genContextMenuContent (menucommands: Command[]) {
// // //       const mItems: VNodeChildren = []
// // //       const options = {
// // //         staticClass: 'v-menu__content',
// // //          'class': {
// // //           ...(this as any).rootThemeClasses,
// // //             'v-menu__content--auto': this.auto,
// // //             'menuable__content__active': this.isActive
// // //             // [(this as any).contentClass.trim()]: true
// // //           },
// // //           style: this.styles,
// // //           // directives: this.genDirectives(),
// // //           ref: 'content',
// // //           on: {
// // //             click: (e: any) => {
// // //               e.stopPropagation()
// // //               if (e.target.getAttribute('disabled')) return
// // //               if ((this as any).closeOnContentClick) this.isContextMenuActive = false
// // //             }
// // //           }
// // //       }
// // //       menucommands.forEach(cmd => {
// // //         mItems.push(this.$createElement(VListTile, options, cmd.text))
// // //       })
// // //       return this.$createElement(VList, options, [mItems])
// // //     },
// // //   }
// // // })
