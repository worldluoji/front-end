
export default class AtomicAttributeManager {
    constructor() {
        
    }

    setMargin(el, binding) {
        if (!binding.value) {
            return
        }
        if (binding.value.marginLeft) {
            el.style.marginLeft = binding.value.marginLeft + 'px';
        }
        if (binding.value.marginRight) {
            el.style.marginRight = binding.value.marginRight + 'px';
        }
        if (binding.value.marginTop) {
            el.style.marginTop = binding.value.marginTop + 'px';
        }
        if (binding.value.marginBottom) {
            el.style.marginBottom = binding.value.marginBottom + 'px';
        }
    }
}