import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SidebarFlyout extends Component {
  @tracked isOpen = false; // Track the open/close state

  @action toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
