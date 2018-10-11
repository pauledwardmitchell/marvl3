class Vendor < ApplicationRecord
  has_many :reviews
  has_many :offerings
  has_many :categories, through: :offerings

  def avg_rating
    ratings_array = self.reviews.map { |r| r.avg_rating }
    avg_rating = ratings_array.inject(0){|sum,x| sum + x } / reviews.count
    avg_rating
  end

  def schools_array
    schools_array = self.reviews.map { |r| r.user.organization.name }
    uniq_schools_array = schools_array.uniq
    uniq_schools_array
  end
end
