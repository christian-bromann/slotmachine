import { Component, h } from '@stencil/core'

@Component({
    tag: 'my-element',
    shadow: true,
})
export class MyElement {
    render() {
        return (<div>Hello World</div>)
    }
}
