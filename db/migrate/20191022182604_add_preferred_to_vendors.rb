class AddPreferredToVendors < ActiveRecord::Migration[5.1]
  def change
    add_column :vendors, :preferred, :boolean, :default => false
  end
end
