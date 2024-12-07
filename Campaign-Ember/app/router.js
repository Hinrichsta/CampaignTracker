import EmberRouter from '@ember/routing/router';
import config from 'campaign-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('home');
  this.route('campaignhome', { path: '/campaign/:campaign_id' });
  this.route('income', { path: '/campaign/:campaign_id/income' });
  this.route('payments', { path: '/campaign/:campaign_id/payment' });
  this.route('items', { path: '/campaign/:campaign_id/items' });
  this.route('vehicles', { path: '/campaign/:campaign_id/Vehicles' });
  this.route('hirelings', { path: '/campaign/:campaign_id/Hirelings' });
  this.route('party', { path: '/campaign/:campaign_id/party' });
  this.route('calendar', { path: '/campaign/:campaign_id/calendar' });
  this.route('about');
  this.route('profile');
  this.route('settings');
});
