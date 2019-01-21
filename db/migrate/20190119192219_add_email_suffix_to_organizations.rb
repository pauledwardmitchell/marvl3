class AddEmailSuffixToOrganizations < ActiveRecord::Migration[5.1]
  def change
    change_table :organizations do |t|
      t.string :email_suffix
    end
  end
end
