import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class topbarComponent extends Component {
  @tracked DropdownVisible = false;
  @tracked DarkMode = true;

  @action toggleDropdown() {
    this.DropdownVisible = !this.DropdownVisible;
  }

  @action closeDropdown() {
    this.DropdownVisible = false;
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
