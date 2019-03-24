/*eslint-disable*/
import Vue from 'vue'

export default Vue.extend({
    name: 'droppable',
    props: {
       droppable: Boolean
    },
    data: () => ({
        isCurrentDropzone: false
    }),
    mounted () {
        if (this.droppable) {
            this.$el.addEventListener('dragstart', this.dragStart)
            this.$el.addEventListener('dragenter', this.draggEnter);
            this.$el.addEventListener('dragleave', this.draggLeave);
            this.$el.addEventListener('dragover', this.dragOver)
            //this.$el.addEventListener('drop', this.DropElement)
        }
    },
    methods: {
        dragStart (e: Event) {
            e.preventDefault()
            this.isCurrentDropzone = true
        },
        dragOver (e: Event) {
            e.preventDefault()
        },
        draggEnter(e: any) {
            e.preventDefault()
            this.$root.$on('drop-data', this.DropElement)
        },
        draggLeave(e: any) {
            this.$root.$off('drop-data', this.DropElement)
        },
        DropElement(e: any) {
            console.log('drop--element')
            this.$children.push(Vue.prototype.$draggData)
        }
    }
})