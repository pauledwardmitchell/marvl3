class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:show]

  def index
  end

  def show
    set_category
  end

  def import
    Review.import(params[:file])
    redirect_to root_url
  end

  private
  def set_category
    @category = Category.find(params[:id])
  end

end
