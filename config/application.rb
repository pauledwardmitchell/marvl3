require_relative 'boot'

require 'csv'
require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Marvl3
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1


    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'localhost:3000', '127.0.0.1:3000', 'https://marvl-next.herokuapp.com'
        resource '*', :headers => :any, :methods => [:get, :post, :options]
      end
    end

    config.active_job.queue_adapter = :delayed_job

    config.action_controller.default_url_options = { host: ENV['BASE_URL'] }

    config.action_mailer.default_url_options = { host: ENV['BASE_URL'] }
    config.action_mailer.asset_host = ENV['BASE_URL']
    config.action_mailer.default_options = {
      from: ENV['SMTP_FROM'],
      reply_to: ENV['SMTP_REPLY_TO']
    }

    config.to_prepare do
      DeviseController.respond_to :html, :json
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
