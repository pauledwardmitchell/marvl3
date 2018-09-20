class Review < ApplicationRecord
  belongs_to :user
  belongs_to :vendor
  has_many :offerings, through: :vendor
  has_many :categories, through: :offerings

  validates :user_id, :vendor_id, :review_content, :rating_service, :rating_quality, presence: true

  def category_ids_array
    @category_ids_array =[]
    self.categories.each do |category|
      @category_ids_array << category.id
    end
    @category_ids_array
  end

  def avg_rating
    (self.rating_quality + self.rating_service) / 2
  end

end
