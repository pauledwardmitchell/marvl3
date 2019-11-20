# Marvl3

## System Requirements

* Ruby 2.3.1
* Postgres >= 9.5

## Setup

```bash
cp .env.example .env # customize as needed
gem install bundler
bundle install
bundle exec rake db:create db:migrate db:seed
```

Run the server:

```bash
bundle exec rails server
```

Run the webpack-dev-server:

```bash
./bin/webpack-dev-server
```

Run the background worker:

```bash
bundle exec rake jobs:work
```

Run the full test suite:

```bash
bundle exec rspec
```
