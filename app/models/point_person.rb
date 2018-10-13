class PointPerson < ApplicationRecord
  belongs_to :vendor

  validates :vendor_id, :name, presence: true

  def name_and_title
    self.name + " - " + self.title
  end

end
