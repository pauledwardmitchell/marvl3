class Vendor < ApplicationRecord
  has_many :reviews
  has_many :offerings
  has_many :categories, through: :offerings
end
