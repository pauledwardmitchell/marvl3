class Category < ApplicationRecord
  has_many :appearances
  has_many :super_categories, through: :appearances
  has_many :super_super_categories, through: :appearances, source: :super_categories

  has_many :offerings
  has_many :vendors, through: :offerings
  has_many :reviews, through: :vendors
end
