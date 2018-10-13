class AddWebsiteToVendors < ActiveRecord::Migration[5.1]
  def change
    change_table :vendors do |t|
      t.string :website
      t.string :street
      t.string :city_state_and_zip
      t.string :main_phone_line
    end
  end
end
