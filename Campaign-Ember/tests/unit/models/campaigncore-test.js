import { setupTest } from 'campaign-ember/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | campaigncore', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('campaigncore', {});
    assert.ok(model, 'model exists');
  });
});
