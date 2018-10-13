class AddVendorIdToPointPeople < ActiveRecord::Migration[5.1]
  def change
    change_table :point_people do |t|
      t.integer :vendor_id
    end
  end
end
