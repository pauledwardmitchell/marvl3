class Review < ApplicationRecord
  belongs_to :user
  belongs_to :vendor
  # has_many :offerings, through: :vendor
  belongs_to :category

  validates :user_id, :vendor_id, :review_content, :rating, presence: true

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      user = User.find_by(email: row["Reviewer Email"].strip)
      vendor = Vendor.find_by(name: row["Vendor Name"].strip)
      category = Category.find_by(name: row["Category"].strip)
      point_person = PointPerson.find_by(name: row["Contact Name"])

      Review.create(user_id: user.id,
                    vendor_id: vendor.id,
                    category_id: category.id,
                    review_content: row["Public Review"],
                    review_private_content: row["Private Review"],
                    rating: row["Rating"])
      if point_person == nil
        PointPerson.create( name: row["Contact Name"],
                            vendor_id: vendor.id,
                            email: row["Contact Email"],
                            phone: row["Contact Number"])
      end
    end
  end

  def points
    num_characters = self.review_content.length

    if self.review_private_content != nil
      num_characters += self.review_private_content.length
    end

    case num_characters
    when 1..100
      return 1
    when 101..200
      return 2
    when 201..300
      return 3
    when 301..400
      return 4
    else
      return 5
    end
  end

  def category_ids_array
    @category_ids_array =[]
    self.categories.each do |category|
      @category_ids_array << category.id
    end
    @category_ids_array
  end

  def content_teaser
    self.review_content[0..45] + "..."
  end

  def days_old
    rational_number = Date.today - self.updated_at.to_date
    integer = rational_number.to_i
    integer
  end

  def has_private_review
    if self.review_private_content.length > 0
      true
    else
      false
    end
  end

end
