class ApisController < ApplicationController

  before_filter :add_allow_credentials_headers

  def landing_search_data
    @categories = Category.all
    @data = { categories: @categories }
    render json: @data
  end

  def add_allow_credentials_headers
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'accept, content-type'
  end

end

