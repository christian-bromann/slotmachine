const getShadowDomHtml = (shadowRoot: ShadowRoot) => {
    let shadowHTML = '';
    for (const el of shadowRoot.childNodes) {
        shadowHTML += el.nodeValue || (el as Element).outerHTML;
    }
    return shadowHTML;
};

// Recursively replaces shadow DOMs with their HTML.
const replaceShadowDomsWithHtml = (rootElement: Element | ShadowRoot) => {
    for (const el of rootElement.querySelectorAll('*')) {
        if (el.tagName === 'MOCHA-FRAMEWORK') {
            continue
        }
        
        if (el.shadowRoot) {
            const slots = el.shadowRoot.querySelectorAll('slot')
            for (const slot of slots) {
                const slotName = slot.getAttribute('name')
                if (slotName) {
                    const replaceEl = el.querySelector('*[slot="' + slot.getAttribute('name') + '"]')!
                    slot.outerHTML = replaceEl.outerHTML
                    replaceEl.remove()
                } else {
                    const replaceEl = el
                    slot.outerHTML = replaceEl.innerHTML
                }
            }
            replaceShadowDomsWithHtml(el.shadowRoot);
            el.innerHTML += getShadowDomHtml(el.shadowRoot)
        }
    }
};

export function transform () {
    replaceShadowDomsWithHtml(document.body)
}

export function injectScript (script: string) {
    const scriptEl = document.createElement('script')
    scriptEl.innerHTML = script
    document.body.appendChild(scriptEl)
}