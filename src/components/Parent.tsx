import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'my-parent',
  shadow: true
})
export class Parent {
  @Prop() tag: string = '';
  @Prop() disabled: boolean = false;
  @Prop() messageInline: {} = {};

  readonly componentName = 'parent';

  render() {
    const classes = [];

    if (this.disabled) {
      classes.push(`${this.componentName}--disabled`);
    }

    return (
      <Host class={classes.join(' ')}>
        Demonstrate slot rerender bug
        {/* this dont rerender slot */}
        <div>
          {/* remove condition: works */}
          {/* wrap with <div />: works */}
          {this.disabled && !!this.tag && (
            <div class="tag" innerHTML={this.tag}/>
          )}
          {/* remove div: works */}
          <div>
            before slot&gt;
            <slot/>
            &lt;after slot
          </div>
        </div>
      </Host>
    );
  }
}
