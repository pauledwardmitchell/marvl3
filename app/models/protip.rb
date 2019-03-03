class Protip < ApplicationRecord

  belongs_to :user
  belongs_to :category

  def points
    case self.content.length
    when 1..100
      return 1
    when 101..200
      return 2
    when 201..300
      return 3
    when 301..400
      return 4
    else
      return 5
    end
  end

end
