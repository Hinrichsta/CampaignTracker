import DS from 'ember-data';

export default DS.Model.extend({
    id: DS.attr(),
    campaign_name: DS.attr(),
    description: DS.attr(),
    public: DS.attr()
});
