class AddReviewPrivateContentToReviews < ActiveRecord::Migration[5.1]
  def change
    change_table :reviews do |t|
      t.string :review_private_content
    end
  end
end
