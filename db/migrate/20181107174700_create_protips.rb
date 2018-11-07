class CreateProtips < ActiveRecord::Migration[5.1]
  def change
    create_table :protips do |t|
      t.integer :category_id
      t.integer :user_id
      t.string :title
      t.string :content

      t.timestamps
    end
  end
end
