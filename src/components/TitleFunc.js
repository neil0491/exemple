import { h, defineComponent } from "vue"

export default defineComponent({
  props: {
    level: {
      default: 1,
    },
  },
  setup({ level }, { slots }) {
    const slot = slots.default ? slots.default() : []
    return () => h(`h${level}`, slot)
  },
})
