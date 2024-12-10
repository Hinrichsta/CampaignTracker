import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class topbarComponent extends Component {
  @tracked DropdownVisible = false;
  @tracked DarkMode = true;

  @action toggleDropdown(event) {
    event.stopPropagation();
    this.DropdownVisible = !this.DropdownVisible;
  }

  @action closeDropdown() {
    this.DropdownVisible = false;
  }

  @action preventcloseDropdown(event) {
    event.stopPropagation(); // Prevent the click inside the menu from closing it
  }

  @action handleClickOutside(event) {
    // Check if the click is outside of the menu and button
    if (
      !event.target.closest('.user-dropdown') &&
      !event.target.closest('.user-icon')
    ) {
      this.closeDropdown();
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

  @action toggleTheme() {
    this.DarkMode = !this.DarkMode;
    if (this.DarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}
