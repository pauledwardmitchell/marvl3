class AddReceivesWeeklyDigestToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :receives_weekly_digest, :boolean, null: false, default: true
  end
end
