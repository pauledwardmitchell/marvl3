class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]

  def index
    @building_and_grounds = SuperSuperCategory.find_by(name: "Building and Grounds")
    @bag_super_categories = @building_and_grounds.super_categories
    @bag_super_categories_array = @building_and_grounds.super_categories_array

    @bag_categories = []
    @bag_super_categories.each do |super_cat|
      super_cat.categories.each do |category|
        @bag_categories << category
      end
    end

    @bag_categories_array = []
    @bag_categories.each do |category|
      category_hash = {
        category_id: category.id,
        category_name: category.name
      }
      @bag_categories_array << category_hash
    end

    @reviews = []
    @bag_categories.each do |category|
      category.reviews do |review|
        @reviews << review
      end
    end

    @reviews_hashes =[]
    @reviews.each do |review|
      review_hash = {
        vendor_id: review.vendor_id,
        user_id: review.user_id,
        category_ids_array: review.category_ids_array,
        review_content: review.review_content,
        avg_rating: review.avg_rating,
        anonymous: review.anonymous
      }
      @reviews_hashes << review_hash
    end

    @bag_data = {
      super_super_category: @building_and_grounds.name,
      super_categories: @bag_super_categories_array,
      categories: @bag_categories_array,
      reviews: @reviews_hashes
    }
    @bag_data.as_json
  end

  def show
  end

  private
  def set_organization
    @organization = Organization.find(params[:id])
  end

end
