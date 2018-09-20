class CreateOfferings < ActiveRecord::Migration[5.1]
  def change
    create_table :offerings do |t|
      t.integer :vendor_id
      t.integer :category_id

      t.timestamps
    end
  end
end
