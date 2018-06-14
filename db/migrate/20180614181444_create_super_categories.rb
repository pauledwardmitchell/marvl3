class CreateSuperCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :super_categories do |t|
      t.string :name
      t.integer :super_super_category_id

      t.timestamps
    end
  end
end
