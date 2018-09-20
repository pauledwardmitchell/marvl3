class SuperSuperCategory < ApplicationRecord
  has_many :super_categories

  def super_categories_array
    @super_categories = self.super_categories
    @super_categories_array = []

    @super_categories.each do |super_cat|
      super_cat_hash = {
        super_category_id: super_cat.id,
        super_category_name: super_cat.name
      }
      @super_categories_array << super_cat_hash
    end
    @super_categories_array
  end

end
