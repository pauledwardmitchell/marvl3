class AddRatingColumnToReviews < ActiveRecord::Migration[5.1]
  def change
    change_table :reviews do |t|
      t.integer :rating
    end
  end
end
