source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


gem 'rails', '~> 6.1.3.1'
gem 'pg', '~> 1.2.3'
gem 'puma', '~> 5.2.2'
gem 'sass-rails', '~> 6.0.0'
gem 'uglifier', '~> 4.2.0'
gem 'webpacker', '~> 5.2.1'

gem 'coffee-rails', '~> 5.0.0'
gem 'jbuilder', '~> 2.11.2'

gem "activejob", '~> 6.1.3.1'
gem 'delayed_job_active_record'

gem 'rack-cors', :require => 'rack/cors'
gem 'devise', '~> 4.7.3'
gem 'dotenv-rails'
gem 'rubyzip', '~> 2.3.0'

gem 'faker'
gem 'pry'
gem 'rexml'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'rspec-rails'
  gem 'capybara', '~> 3.35.3'
  gem 'factory_bot_rails'
  gem 'selenium-webdriver'
  gem 'webdrivers'
  gem 'rspec_junit_formatter'
  gem 'simplecov', require: false, group: :test
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '~> 4.1.0'
  gem 'listen', '~> 3.5.1'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.1'
  gem 'rb-readline'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

ruby "3.0.1"
