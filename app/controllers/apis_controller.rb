class ApisController < ApplicationController

  # before_filter :add_allow_credentials_headers

  def landing_search_data
    @categories = Category.all
    @data = { categories: @categories }
    render json: @data
  end

  def check_for_user
    if current_user
      @user = current_user
    else
      @user = {}
    end
    render json: @user
  end

  def building_and_grounds
    @data = []
    bag = SuperSuperCategory.find_by(name: "Building and Grounds")
    super_categories = bag.super_categories

    super_categories.each do |super_cat|
      all_categories_array = []

      super_cat.categories.each do |category|
        org_reviews = category.reviews.find_all { |r| r.user.organization.id == 1}
        org_reviews_hashes = []
        org_reviews.each do |review|

          review_data = { vendorName: Vendor.find(review.vendor_id).name,
                          dateWritten: review.created_at,
                          stars: review.rating_service,
                          review: review.review_content,
                          id: review.id
                        }

          org_reviews_hashes << review_data

        end

        category_reviews_hash = {
          sub: category.name,
          reviews: org_reviews_hashes
        }

        all_categories_array << category_reviews_hash

      end

      super_hash = {
        name: super_cat.name,
        subCategories: all_categories_array
      }

      @data << super_hash

    end
    render json: @data
  end

end

