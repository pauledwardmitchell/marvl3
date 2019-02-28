class PointPerson < ApplicationRecord
  belongs_to :vendor

  validates :vendor_id, :name, presence: true

  def name_and_title
    if self.title
      self.name + " - " + self.title
    else
      self.name
    end
  end

end
