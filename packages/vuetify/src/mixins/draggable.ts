/*eslint-disable*/
import Vue from 'vue'

export default Vue.extend({
    name: 'draggable',
    props: {
      draggable: Boolean
    },
    data: () => ({
        draggContainer: (null as any)
    }),
    mounted () {
        if (this.draggable ) {
            (this.$el as HTMLBaseElement).draggable = true
            this.$el.addEventListener('dragstart', this.dragStart)
            this.$el.addEventListener('drop', this.Drop)
        }
    },
    methods: {
        getDragContext (): Vue {
            return this
        },
        dragStart (e: Event) {
            Vue.prototype.$draggData = this
        },
        Drop(e: any) {
            this.$root.$emit('drop-data')
        }
    }
})

