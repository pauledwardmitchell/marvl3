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
    bag = SuperSuperCategory.find_by(name: "Building and Grounds")
    super_categories = bag.super_categories

    @data = build_from_super_super_categories(super_categories)

    render json: @data
  end

  def human_resources
    hr = SuperSuperCategory.find_by(name: "Human Resources")
    super_categories = hr.super_categories

    @data = build_from_super_super_categories(super_categories)

    render json: @data
  end

  def technology
    tech = SuperSuperCategory.find_by(name: "Technology")
    super_categories = tech.super_categories

    @data = build_from_super_super_categories(super_categories)

    render json: @data
  end

  def supplies
    supplies = SuperSuperCategory.find_by(name: "Supplies")
    super_categories = supplies.super_categories

    @data = build_from_super_super_categories(super_categories)

    render json: @data
  end

  def student_instruction_and_services
    siss = SuperSuperCategory.find_by(name: "Student Instruction / Student Services")
    super_categories = siss.super_categories

    @data = build_from_super_super_categories(super_categories)

    render json: @data
  end

  def org_show_data
    org = Organization.find(1)

    @data = {
      name: org.name,
      website: org.website,
      logo_link: org.logo_link,
      users: user_names_and_emails_from_org(org)
    }
  end

  private

  def user_names_and_emails_from_org(org)
    @data = []

    org.users.each do |u|
      user_hash = { name: u.first_name + " " + u.last_name + " - " + u.email }
      @data << user_hash
    end

    @data
  end

  def build_from_super_super_categories(super_categories)
    @data =[]
    super_categories_sorted = super_categories.sort{|a,b| a['name']<=>b['name']}

    super_categories_sorted.each do |super_cat|
      all_categories_array = []

      sorted_categories = super_cat.categories.sort{|a,b| a['name']<=>b['name']}

      sorted_categories.each do |category|
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
    @data
  end

end

