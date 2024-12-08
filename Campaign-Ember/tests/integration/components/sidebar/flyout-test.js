import { module, test } from 'qunit';
import { setupRenderingTest } from 'campaign-ember/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sidebar/flyout', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Sidebar::Flyout />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Sidebar::Flyout>
        template block text
      </Sidebar::Flyout>
    `);

    assert.dom().hasText('template block text');
  });
});
