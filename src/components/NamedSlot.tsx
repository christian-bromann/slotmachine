import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "slot-test",
  shadow: true,
})
export class SlotTest {
  render() {
    return (
      <Host class="test">
        <span class="test1">test1 div here</span>
        <span class="test2">
          <slot name="test" />
        </span>
      </Host>
    );
  }
}