class Review < ApplicationRecord
  belongs_to :user
  belongs_to :vendor
  has_many :offerings, through: :vendor
  has_many :categories, through: :offerings

  validates :user_id, :vendor_id, :review_content, :rating_service, :rating_quality, presence: true

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      user = User.find_by(email: row["email"])
      vendor = Vendor.find_by(name: row["vendor"])
      Review.create(user_id: user.id,
                    vendor_id: vendor.id,
                    review_content: row["content"],
                    rating_quality: row["quality"],
                    rating_service: row["service"])
    end
  end

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

  def content_teaser
    self.review_content[0..45] + "..."
  end

  def days_old
    rational_number = Date.today - self.updated_at.to_date
    integer = rational_number.to_i
    integer
  end

end
