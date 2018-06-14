class CreateSuperSuperCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :super_super_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
