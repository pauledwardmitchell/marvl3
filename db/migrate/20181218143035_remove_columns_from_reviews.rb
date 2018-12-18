class RemoveColumnsFromReviews < ActiveRecord::Migration[5.1]
  def change
    remove_column :reviews, :rating_service
    remove_column :reviews, :rating_quality
    remove_column :reviews, :anonymous
  end
end
