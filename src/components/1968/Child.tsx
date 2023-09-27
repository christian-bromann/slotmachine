import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-child',
})
export class Child {
  // mutable doesnt have an effect
  @Prop() text: string = '';

  render() {
    return this.text;
  }
}