class ReviewsController < ApplicationController

  def landing_search_data
    @categories = Category.all
    @data = { categories: @categories }
    render json: @data
  end

end
