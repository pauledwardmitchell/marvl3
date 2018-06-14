class Review < ApplicationRecord
  validates :user_id, :vendor_id, :review_content, :rating_service, :rating_quality, presence: true
end
