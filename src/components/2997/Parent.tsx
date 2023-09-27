import { Component, h, Host, State } from '@stencil/core'

@Component({
    tag: 'my-component',
    shadow: true,
})
export class Parent {
    @State() state = true

    updateState() {
        this.state = !this.state;
    }

    render() {
        return <Host>
            <div style={{ background: '#eee', margin: '1em', padding: '1em' }}>
                <nested-component state={this.state}>
                    <slot />
                </nested-component>
                <button onClick={() => this.updateState()}>
                    Update State
                </button>
            </div>
        </Host>
    }
}
