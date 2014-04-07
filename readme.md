# Simple Pedigree management website

> Project is under construction  
> Subscribe my blog's [RSS](http://truongtx.me/atom.xml) for more information

# Website Deployment instruction

## Requirements

- Nodejs and npm

## Tools

    $ npm install -g nodemon
    $ npm install -g browserify
    $ npm install -g gulp
    $ npm install -g bower

# Website deployment

- Clone the project

    $ git clone git@github.com:tmtxt/tmtxt_pedigree.git
    $ cd easy_pedigree
    $ mkdir -p public/js_app

- Install the dependencies

    $ npm install

- Generate, uglify files

    $ browserify -r js-csp > ./public/js_app/js-csp.js
    $ gulp setup

- Create sample config file `database/database.json`, you need to edit
    this file to match your database configuration

    $ gulp create-config-files

# Database setup

## Requirement

- [schemup](https://github.com/brendonh/schemup)
- PostgreSQL
- python, virtualenv, pip

## Steps

- Create new env using virtualenv and activate it
- Create a file named requirements.txt

    storm==0.19
    Twisted==12.0.0
    psycopg2==2.5
    pyyaml==3.10
    boto
    git+git://github.com/brendonh/schemup.git@5f5d35f5c7e9708e62ca43aa4743610e2cb696ae

- Install the requirements with `pip install -r requirements.txt`
- Assume that you have change the file `database/database.json` content
corresponding to your database server information
- Cd to the **database** directory and run `update.py` to setup the database

    $ python update.py commit

- If you want some sample data, you can execute the file `sample-data.sql`

# Start the website

Run the website using `node` or `nodemon`

    $ nodemon app.js

Default account
- User: admin
- Password: password

# Demo images

![Demo](http://i58.tinypic.com/rrt743.png)

![Demo](http://i57.tinypic.com/aeql1k.png )

![Demo](http://i58.tinypic.com/2w4b1j7.png)

![Demo](http://i60.tinypic.com/260q2wk.png)

![Demo](http://i62.tinypic.com/2wrhfk9.png )

![Demo](http://i57.tinypic.com/4uf8rk.png ) 
