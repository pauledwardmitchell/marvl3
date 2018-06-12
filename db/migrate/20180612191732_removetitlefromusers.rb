class Removetitlefromusers < ActiveRecord::Migration[5.1]
  def change
    remove_column :reviews, :title
    remove_column :reviews, :content
  end
end
