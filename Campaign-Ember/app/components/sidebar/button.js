import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SidebarButton extends Component {
  @tracked isOpen = false; // Track the open/close state
  @action toggleSidebar() {
    // Trigger the action to toggle the sidebar
    this.isOpen = !this.isOpen;
    const sidebar = document.querySelector('.sidebar');
    const button = document.querySelector('.floating-btn');
    if (sidebar) {
      sidebar.classList.toggle('open');
      button.classList.toggle('open');
    }
  }
}
