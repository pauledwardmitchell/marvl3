class AddOrgIdToUser < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.integer :organization_id
    end
  end
end
