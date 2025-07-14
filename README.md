# TTRPG Campaign Tracker Site
A simple website that allows for the tracking of player information for a campaign.  Allows for individual campaigns to track party members, payments/income, magic items/consumable items, vehicles, and hirelings with.

## Current Status
Currently the main functionalities are creating accounts, campaigns, and transactions in campaigns.  Party members must be edited in the Django admin panel (localhost:8000/django/admin) under the party members table.  The Total gold and Indivdual Gold function requires there to be at least 1 Income transaction and 1 Payment transaction before it will calculate anything.

All other functionalities are not ready, but the tables are there and are able to be called from the admin page and api.  The Front end also has the pages, but they do not have anything

## Installation
CD into the root directory

### Build The Application
```bash
docker-compose run django bash
python Campaign-Django/manage.py migrate
python Campaign-Django/manage.py createsuperuser
exit

docker-compose -f docker-compose.prod.yml exec django python manage.py migrate
docker-compose -f docker-compose.prod.yml exec django python manage.py createsuperuser
```

For Better Security you will need to create the environmental Variables.  Copy the .env.example, rename it to .env, and edit the default values to your liking.  Then run the commands above.

## Getting Started
To Start the site open 2 admin terminal windows and cd into the root directory of the project

#### Starting the Application
```bash
docker-compose up
```


Campaign Specific Settings can be configured within the site's settings page.


## License
MIT License

Copyright (c) 2024 Tyler A Hinrichs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.