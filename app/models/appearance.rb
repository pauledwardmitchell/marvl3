class Appearance < ApplicationRecord
  belongs_to :category
  belongs_to :super_category
end
