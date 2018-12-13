class ApisController < ApplicationController

  # before_filter :add_allow_credentials_headers
  skip_before_action :authenticate_user!

#ENDPOINTS FOR APP BAR
  def check_for_user
    if current_user
      @user = current_user
    else
      @user = {}
    end
    render json: @user
  end

  def existing_vendors
    @unsorted_data =[]
    vendors = Vendor.all

    vendors.each do |v|
      vendor_hash = {
        name: v.name,
        id: v.id
      }
      @unsorted_data << vendor_hash
    end

    @data = @unsorted_data.sort{|a,b| a[:name]<=>b[:name]}
    render json: @data
  end

  def search_categories_suggestions
    @unsorted_data =[]
    categories = Category.all

    categories.each do |c|
      category_hash = {
        label: c.suggestion_label,
        value: c.suggestion_label,
        id: c.id,
        type: "categories"
      }
      @unsorted_data << category_hash
    end

    @data = @unsorted_data.sort{|a,b| a[:label]<=>b[:label]}
    render json: @data
  end

#ENDPOINTS FOR LANDING PAGE
  def landing_search_data
    @unsorted_data =[]
    categories = Category.all
    vendors = Vendor.all
    organizations = Organization.all
    s_s_categories = SuperSuperCategory.all

    s_s_categories.each do |ssc|
      s_s_category_hash = {
        label: ssc.name + " (Umbrella Category)",
        value: ssc.name + " (Umbrella Category)",
        id: ssc.id,
        type: "super_super_categories"
      }
      @unsorted_data << s_s_category_hash
    end

    categories.each do |c|
      category_hash = {
        label: c.suggestion_label,
        value: c.suggestion_label,
        id: c.id,
        type: "categories"
      }
      @unsorted_data << category_hash
    end

    vendors.each do |v|
      vendor_hash = {
        label: v.name + " (Vendor Page)",
        value: v.name + " (Vendor Page)",
        id: v.id,
        type: "vendors"
      }
      @unsorted_data << vendor_hash
    end

    organizations.each do |s|
      organization_hash = {
        label: s.name + " (School Page)",
        value: s.name + " (School Page)",
        id: s.id,
        type: "organizations"
      }
      @unsorted_data << organization_hash
    end

    @data = @unsorted_data.sort{|a,b| a[:label]<=>b[:label]}
    render json: @data
  end

  def search_vendors_suggestions
    @unsorted_data =[]
    vendors = Vendor.all

    vendors.each do |v|
      vendor_hash = {
        label: v.name,
        value: v.name,
        id: v.id,
        type: "vendors"
      }
      @unsorted_data << vendor_hash
    end

    @data = @unsorted_data.sort{|a,b| a[:label]<=>b[:label]}
    render json: @data
  end

  def landing_schools_data
    all_schools = Organization.all
    schools = all_schools.sort{|a,b| a['name']<=>b['name']}
    @data = []

    schools.each do |s|
      schools_hash = {
        id: s.id,
        name: s.name,
        logo_link: s.logo_link
      }
      @data << schools_hash
    end

    render json: @data
  end

  def landing_recent_activity_data
    @data =[]
    reviews = Review.order(created_at: :asc).reverse_order.limit(10).reverse

    reviews.each do |r|
      review_hash = {
        initials: r.user.initials,
        school: r.user.organization.name,
        vendor: r.vendor.name,
        date: r.created_at.strftime("%m/%d/%Y"),
        img: r.user.organization.logo_link,
        category: r.categories[0].suggestion_label,
        super_category: r.categories[0].super_categories[0].name,
        super_super_category: r.categories[0].super_categories[0].super_super_category.name,
        text: r.review_content,
        review_private_content: r.review_private_content,
        id: r.id
      }
      @data << review_hash
    end
    render json: @data
  end

#END POINTS FOR TAXONOMY DATA
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

#ENDPOINTS FOR ORGANIZATION SHOW
  def org_show_data
    org = Organization.find(params[:org])

    @data = {
      name: org.name,
      website: org.website,
      logo_link: org.logo_link,
      users: user_names_and_emails_from_org(org)
    }

    render json: @data
  end

#ENDPOINTS FOR USER SHOW
  def user_show_data
    user = User.find(params[:user])

    @data = {
      name: user.full_name,
      school_name: user.organization.name,
      logo_link: user.organization.logo_link,
      points: user.points,
      reviews: reviews_from_user(user),
      protips: protips_from_user(user)
    }

    render json: @data
  end

#ENDPOINTS FOR VENDOR SHOW
  def vendor_show_data
    vendor = Vendor.find(params[:vendor])

    @data = {
      name: vendor.name,
      street: vendor.street,
      city_state_and_zip: vendor.city_state_and_zip,
      categories_array: categories_from_vendor(vendor),
      schools_array: school_relationships_from_vendor(vendor),
      point_people_array: point_people_from_vendor(vendor)
    }

    render json: @data
  end

  def vendor_show_reviews_data
    vendor = Vendor.find(params[:vendor])

    @data = {
      reviews: reviews_from_vendor(vendor)
    }

    render json: @data
  end


#ENDPOINTS FOR CATEGORY SHOW
  def category_show_data
    category = Category.find(params[:category])

    @data = {
      name: category.full_name,
      vendors: vendors_data_from_category(category),
      protips: protips_from_category(category)
    }

    render json: @data
  end


  private

  def protips_from_category(category)
    protips_array = []
    category.protips.each do |p|
      protip_hash = {
        id: p.id,
        category: category.name,
        category_tag: category.name.parameterize,
        user: p.user.full_name,
        title: p.title,
        content: p.content,
        date_written: p.updated_at.strftime("%m/%d/%Y")
      }
      protips_array << protip_hash
    end
    protips_array
  end

  def protips_from_user(user)
    protips_array = []
    user.protips.each do |p|
      protip_hash = {
        id: p.id,
        category_id: p.category.id,
        category: p.category.name,
        category_tag: p.category.name.parameterize,
        user: user.full_name,
        title: p.title,
        content: p.content,
        date_written: p.updated_at.strftime("%m/%d/%Y")
      }
      protips_array << protip_hash
    end
    protips_array
  end

  def reviews_from_vendor(vendor)
    vendor_reviews_array = []
    vendor.reviews.each do |r|
      review_hash = {
        id: r.id,
        school_name: r.user.organization.name,
        school_id: r.user.organization.id,
        rating: r.rating,
        review: r.review_content,
        private_review: r.review_private_content,
        reviewer: r.user.full_name,
        days_ago: r.days_old
      }
      vendor_reviews_array << review_hash
    end
    vendor_reviews_array
  end

  def reviews_from_user(user)
    user_reviews_array = []
    user.reviews.each do |r|
      review_hash = {
        id: r.id,
        school_name: user.organization.name,
        school_id: user.organization.id,
        vendor_name: r.vendor.name,
        vendor_id: r.vendor.id,
        rating: r.rating,
        review: r.review_content,
        private_review: r.review_private_content,
        reviewer: user.full_name,
        days_ago: r.days_old,
        date: r.updated_at.strftime("%m/%d/%Y")
      }
      user_reviews_array << review_hash
    end
    user_reviews_array
  end

  def school_relationships_from_vendor(vendor)
    all_schools_array = []
    vendor.reviews.each do |r|
      all_schools_array << r.user.organization.name
    end
    unique_schools_array = all_schools_array.uniq
    unique_schools_array
  end

  def categories_from_vendor(vendor)
    categories_array =[]
    vendor.categories.each do |category|
      cat_hash = {
        id: category.id,
        name: category.full_name
      }
      categories_array << cat_hash
    end
    categories_array
  end

  def point_people_from_vendor(vendor)
    point_people_array = []
    vendor.point_people.each do |pp|
      pp_hash = {
        id: pp.id,
        name_and_title: pp.name_and_title,
        phone: pp.phone,
        email: pp.email
      }
      point_people_array << pp_hash
    end
    point_people_array
  end

  def vendors_data_from_category(category)
    @data = []

    category.vendors.each do |v|
      vendor_hash = {
        id: v.id,
        name: v.name,
        avg_rating: v.avg_rating,
        schools_array: v.schools_array,
        reviews_count: v.reviews.count
      }
      @data << vendor_hash
    end

    @data
  end

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
                          vendorId: review.vendor_id,
                          dateWritten: review.created_at.strftime("%m/%d/%Y"),
                          stars: review.rating,
                          review: review.review_content,
                          private_review: review.review_private_content,
                          id: review.id
                        }

          org_reviews_hashes << review_data

        end

        category_reviews_hash = {
          sub: category.name,
          sub_id: category.id,
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

