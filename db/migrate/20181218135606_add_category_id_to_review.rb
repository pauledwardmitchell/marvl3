class AddCategoryIdToReview < ActiveRecord::Migration[5.1]
  def change
    change_table :reviews do |t|
      t.integer :category_id
    end
  end
end
