class CreatePointPerson < ActiveRecord::Migration[5.1]
  def change
    create_table :point_people do |t|
      t.string :name
      t.string :title
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
