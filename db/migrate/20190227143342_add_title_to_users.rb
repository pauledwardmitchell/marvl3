class AddTitleToUsers < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.string :title
    end
  end
end
