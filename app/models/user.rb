class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :organization
  has_many :reviews
  has_many :protips

  def full_name
    first_name + " " + last_name
  end

  def initials
    intitals = self.first_name[0] + self.last_name[0]
    up_initials = intitals.upcase
    up_initials
  end

  def points
    num_reviews = self.reviews.count
    num_protips = self.protips.count
    points = ( num_reviews*2 ) + ( num_protips*3 )
    points
  end
end
