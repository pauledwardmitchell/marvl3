class RemoveSuperCategoriesIdsArrayFromCategories < ActiveRecord::Migration[5.1]
  def change
    remove_column :categories, :super_category_ids
  end
end
