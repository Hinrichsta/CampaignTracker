import Model, { attr } from '@ember-data/model';

export default class CampaignModel extends Model {
    @attr id;
    @attr campaign_name;
    @attr description;
    @attr public;
} 