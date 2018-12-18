class Vendor < ApplicationRecord
  has_many :reviews
  has_many :offerings
  has_many :point_people
  has_many :categories, through: :reviews

  def avg_rating
    ratings_array = self.reviews.map { |r| r.rating }
    avg_rating = ratings_array.inject(0){|sum,x| sum + x } / reviews.count
    avg_rating
  end

  def schools_array
    schools_array = self.reviews.map { |r| r.user.organization.name }
    uniq_schools_array = schools_array.uniq
    uniq_schools_array
  end
end
