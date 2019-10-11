class AddActiveFalseToUsers < ActiveRecord::Migration[5.1]
  def change
    change_column_default(:users, :active, true)
  end
end
