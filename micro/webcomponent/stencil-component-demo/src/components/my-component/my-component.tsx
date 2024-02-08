import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';


/**
 * tag: Set the element's name to 'my-component'
 * styleUrl: Apply the stylesheet 'my-component.css' to the component
 * shadow: Enable native Shadow DOM functionality for this component
 */
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  /**
   * The first name
   * @Prop() tells Stencil that the property is public to the component, 
   * and allows Stencil to rerender when any of these public properties change
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  // In order for the component to render something to the screen, we must declare a render() function that returns JSX.
  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
