import { h, Fragment } from '@stencil/core'
import { render } from '@wdio/browser-runner/stencil'
import { $, expect } from '@wdio/globals'

import diffable from 'https://esm.sh/diffable-html@5.0.0'

import { MyElement } from './components/Component.js'
import { SlotTest } from './components/NamedSlot.js'
import { Parent } from './components/Parent.js'
import { Child } from './components/Child.js'
import { transform, injectScript } from './utils/utils.js'

describe('Lit component testing', () => {
    it.skip('should increment value on click automatically', async () => {
        await render({
            components: [MyElement],
            autoApplyChanges: true,
            template: () => (
                <my-element />
            )
        })

        console.log(await $('my-element').getHTML())
        transform()
        console.log(await $('my-element').getHTML())
    })

    it.skip('slow test', async () => {
        await render({
            components: [SlotTest],
            autoApplyChanges: true,
            template: () => (
                <div>
                    <slot-test>
                        <span slot="test">test slot test</span>
                    </slot-test>
                    <br /><br /><br />
                    <p>
                        <slot-test>
                            <span slot="test">test slot in a p tag</span>
                        </slot-test>
                    </p>
                </div>
            )
        })

        // verify we have now shadow elements
        if (process.env.REMOVE_SHADOW_PROP) {
            expect([...document.querySelector('stencil-stage')!.querySelectorAll('*')].filter(el => el.shadowRoot).length).toBe(0)
        }

        transform()
        await browser.pause(100)
        console.log(diffable(await $('stencil-stage').getHTML(false)))
    })

    it('parent', async () => {
        injectScript(/*js*/`function doParentRerender(selector) {
            const parent = document.querySelector(selector);
            const child = parent.querySelector('my-child');
            console.log(parent, child)
            // toogle
            parent.disabled = !parent.disabled;

            if(parent.disabled){
                parent.messageInline = {isPrimary: true};
                child.text = "changed text";
            } else {
                parent.messageInline = {isPrimary: false};
                child.text = "other changed text for rerender";
            }
        }`)
        await render({
            components: [Parent, Child],
            autoApplyChanges: true,
            template: () => (
                <>
                    <button onClick={() => doParentRerender('my-parent')}>Change prop (2nd rerender slot is gone)</button><br /><br />
                    <my-parent tag="Property for rerender">
                        <my-child text="Default slot text"></my-child>
                    </my-parent>
                </>
            )
        })

        // verify we have no shadow elements
        if (process.env.REMOVE_SHADOW_PROP) {
            expect([...document.querySelector('stencil-stage')!.querySelectorAll('*')].filter(el => el.shadowRoot).length).toBe(0)
        }

        // await browser.pause(100)
        console.log(diffable(await $('stencil-stage').getHTML(false)))
        await $('stencil-stage button').click()
        if (!process.env.REMOVE_SHADOW_PROP) {
            transform()
        }
        await browser.pause(100)
        console.log(diffable(await $('stencil-stage').getHTML(false)))
        // await browser.debug()
    })
})
