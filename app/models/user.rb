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
end
