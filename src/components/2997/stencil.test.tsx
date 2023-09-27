import { h, Fragment } from '@stencil/core'
// import { $ } from '@wdio/globals'

import { Nested } from './Nested.js'
import { Parent } from './Parent.js'

import { render, getDiffableHTML } from '../../utils/utils.js'

describe('issue #2997', () => {
    it('should reproduce issue', async () => {
        await render({
            components: [Parent, Nested],
            autoApplyChanges: true,
            template: () => (
                <>
                    <h1>Nested slot mis-ordering</h1>

                    <p>
                    This is a simple test case for an issue I'm running into with Stencil's
                    virtual DOM implementation and nested slots when not using Shadow DOM. Here's the issue I'm running into:
                    </p>

                    <ol>
                    <li>A parent component's template includes a child component.</li>
                    <li>The parent's slot is passed into the child component.</li>
                    <li>A prop on the child component is set based on the state of the parent component.</li>
                    <li>The slot content is misordered in relation to the child component's template content.</li>
                    <li>When the parent component's state changes the components re-render and the content is ordered correctly.</li>
                    </ol>

                    <my-component>
                    <h1>Slot</h1>
                    </my-component>

                    <p>
                    The "Slot" <code>h1</code> should come after the "State: true" text.
                    When the state is updated (using the button) it will switch to the correct order.
                    </p>

                    <p>
                    I originally ran into this in a more complex component.
                    When the slots were re-ordered it would reload iframes breaking video playback.
                    </p>

                    <my-component>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/kx_LgXd0uAk" title="YouTube video player"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    </my-component>
                </>
            )
        })

        console.log(await getDiffableHTML())
        // await $('stencil-stage').$('>>>button').click()
        // await browser.pause(100)
        // console.log(await getDiffableHTML())
        await browser.debug()
    })
})
