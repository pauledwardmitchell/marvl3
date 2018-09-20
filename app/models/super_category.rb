class SuperCategory < ApplicationRecord
  belongs_to :super_super_category
  has_many :appearances
  has_many :categories, through: :appearances
  has_many :offerings, through: :categories
  has_many :vendors, through: :offerings
  has_many :reviews, through: :vendors

  def categories_array
    @categories = self.categories
    @categories_array = []

    @categories.each do |category|
      category_hash = {
        category_id: category.id,
        category_name: category.name
      }
      @categories_array << category_hash
    end
    @category_hash
  end
end
