import { h, Fragment } from '@stencil/core'
import { $ } from '@wdio/globals'

import { Child } from './Child.js'
import { Parent } from './Parent.js'

import { transform, injectScript, render, getDiffableHTML } from '../../utils/utils.js'

describe('issue #1968', () => {
    it('should reproduce issue', async () => {
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

                    <button onClick={() => 
                        // @ts-expect-error
                        doParentRerender('my-parent')
                    }>Change prop (2nd rerender slot is gone)</button><br /><br />
                    <my-parent tag="Property for rerender">
                        <my-child text="Default slot text"></my-child>
                    </my-parent>
                </>
            )
        })

        console.log(await getDiffableHTML())
        await $('stencil-stage button').click()
        if (!process.env.REMOVE_SHADOW_PROP) {
            transform()
        }
        await browser.pause(100)
        console.log(await getDiffableHTML())
    })
})
