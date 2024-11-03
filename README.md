# TTRPG Campaign Tracker Site
A simple website that allows for the tracking of player information for a campaign.  Allows for individual campaigns to track party members, payments/income, magic items/consummable items, vehicles, and hirelings with.

## Installation
To quickly get started with this use
```bash
docker build .
docker-compose run web bash
python manage.py migrate
python manage.py createsuperuser
exit
```
For Better Security you will need to create the environmental Variables.  Copy the .env.example, rename it to .env, and edit the default values to your liking.  Then run the commands above.

## Getting Started
To Start the site run
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