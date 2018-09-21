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

          review_data = { vendorName: Vendor.find(review.vendor_id),
                          dateWritten: review.created_at,
                          stars: review.rating_service,
                          review: review.review_content
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

      # super_hash = { name: super_cat.name,
      #                  subCategories: [
      #                    super_cat.categories.each do |category|
      #                      { sub: category.name,
      #                        reviews: [
      #                          category.reviews.each do |review|
      #                            { vendorName: Vendor.find(review.vendor_id),
      #                              dateWritten: review.created_at,
      #                              stars: review.rating_service,
      #                              review: review.review_content
      #                            }
      #           end
      #         ]
      #       }
      #     end
      #   ]
      # }

  # def index
  #   @user = current_user
  #   @vendors = Vendor.all
  #   @categories = Category.all.order('name ASC')
  #   @offerings = Offering.all
  #   @vendor = Vendor.new
  #   @vendor_hashes = []

  #   @vendors.each do |vendor|
  #     vendor_hash = {
  #       vendor_id: vendor.id,
  #       vendor_name: vendor.name,
  #       vendor_reviews_count: vendor.reviews.count,
  #       vendor_avg_rating: vendor.avg_rating
  #     }
  #     @vendor_hashes << vendor_hash
  #   end

  #   @data = {
  #     vendors: @vendors,
  #     categories: @categories,
  #     offerings: @offerings,
  #     vendor_hashes: @vendor_hashes
  #   }
  # end


  # def building_and_grounds
  #   @building_and_grounds = SuperSuperCategory.find_by(name: "Building and Grounds")
  #   @bag_super_categories = @building_and_grounds.super_categories
  #   @bag_categories = @bag_super_categories.categories_array

  #   @reviews = @bag_super_categories.reviews
  #   @reviews_hashes =[]

  #   @reviews.each do |review|
  #     review_hash = {
  #       vendor_id: review.vendor_id,
  #       user_id: review.user_id,
  #       category_ids_array: review.category_ids_array,
  #       review_content: review.review_content,
  #       avg_rating: review.avg_rating,
  #       anonymous: review.anonymous
  #     }
  #     @reviews_hashes << review_hash
  #   end

  #   @bag_data = {
  #     super_super_category: @building_and_grounds.name,
  #     super_categories: @bag_super_categories,
  #     categories: @bag_categories,
  #     reviews: @reviews_hashes
  #   }
  # end

  # def add_allow_credentials_headers
  #   response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'
  #   response.headers['Access-Control-Allow-Credentials'] = 'true'
  #   response.headers['Access-Control-Allow-Headers'] = 'accept, content-type'
  # end

end

