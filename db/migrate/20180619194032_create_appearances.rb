class CreateAppearances < ActiveRecord::Migration[5.1]
  def change
    create_table :appearances do |t|
      t.integer :super_category_id
      t.integer :category_id

      t.timestamps
    end
  end
end
