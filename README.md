# Django News

## How to hack locally

Disclaimer:

This setup instructions are focused on Linux users, if you are using MacOs or Windows, you might need to adapt.

TL;DR:

* `sudo apt install virtualenvwrapper`

* `source /usr/local/bin/virtualenvwrapper.sh`

* `mkvirtualenv django-news --python=\`which python3\``

* `pip install -r requirements.txt`

* `python manage.py migrate`

* `python manage.py runserver`, then open another tab on terminal

* `sudo apt install npm node`

* `cd frontend`

* `npm i`

* `npm run dev`

Longer version:

#### Python Virtualenv

1. Choose and download

    First, setup your favorite virtualevn. I recommend [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/).

2. Create and activate your virtualenv.

    If you are using virtualenvwrapper. You might need to source it on your terminal first.

    `source /usr/local/bin/virtualenvwrapper.sh`

    To create you virtual environment just prompt: ``mkvirtualenv {your_venv_name} --python=`which python3\` ``

    It will activate automatically. But, for future reference, when you already have an environment set up, to activate it you prompt:

    `workon {your_venv_name}`

    And to deactivate it, just prompt:

    `deactivate`

#### Python requirements

With your virtualenv set up, just `pip install -r requirements.txt` on root folder.

#### Frontend requirements

You will need [npm](https://www.npmjs.com/) and [Node](https://nodejs.org).

On Linux you might get those by `sudo apt install npm` and `sudo apt install nodejs`

Then `cd` into frontend folder: `cd frontend`

And install project requirements locally:

`npm i`

#### Raise your node server

You need this to server webpack automagically bundled assets after each change on frontend files

`npm run dev`

#### Migrate database schema

Back at root folder (you might need to `cd ..`)

`python manage.py migrate`

#### Populate Database

Now your database is migrated, you will need to populate it:

`python manage.py populate_db`

Don't worry about duplicates, this command will only update your entities in case your database already have some (or all) the data the script is supposed to populate.

#### Raise your Django local server

`python manage.py runserver`

## About the project

This repo refers to a Django application that serve some news to a react application to consume and render it.

Author: [Marcelo Tokarnia](https://www.github.com/marcelotokarnia)

Deployed at: [django-news@Heroku](https://django-news.herokuapp.com/)
