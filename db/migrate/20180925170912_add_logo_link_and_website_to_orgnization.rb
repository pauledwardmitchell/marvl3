class AddLogoLinkAndWebsiteToOrgnization < ActiveRecord::Migration[5.1]
  def change
    change_table :organizations do |t|
      t.string :website,
      t.string :logo_link
    end
  end
end
