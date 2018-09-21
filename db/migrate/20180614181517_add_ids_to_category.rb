class AddIdsToCategory < ActiveRecord::Migration[5.1]
  def change
    change_table :categories do |t|
      t.string 'super_category_ids', array: true
    end
    add_index :categories, :super_category_ids, using: 'gin'
  end
end
