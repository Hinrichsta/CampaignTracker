import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SidebarFlyout extends Component {
    @tracked isOpen = false; // Track the open/close state

    @action toggleSidebar(event) {
        event.stopPropagation();
        this.isOpen = !this.isOpen;
    }

    @action closeMenu() {
        this.isOpen = false;
    }

    @action preventCloseMenu(event) {
        event.stopPropagation(); // Prevent the click inside the menu from closing it
    }

    @action handleClickOutside(event) {
    // Check if the click is outside of the menu and button
    if (
        !event.target.closest('.sidebar') &&
        !event.target.closest('.floating-btn')
    ) {
        this.closeMenu();
    }
  }

  constructor() {
      super(...arguments);
      document.addEventListener('click', this.handleClickOutside.bind(this));
  }

    // Remove event listener when the component is destroyed
    willDestroy() {
      super.willDestroy();
      document.removeEventListener('click', this.handleClickOutside.bind(this));
    }
}