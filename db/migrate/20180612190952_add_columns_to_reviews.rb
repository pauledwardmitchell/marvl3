class AddColumnsToReviews < ActiveRecord::Migration[5.1]
  def change
    change_table :reviews do |t|
      t.integer :user_id
      t.integer :vendor_id
      t.string :review_content
      t.integer :rating_service
      t.integer :rating_quality
      t.boolean :anonymous

    end
  end
end
