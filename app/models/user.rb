class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :organization
  has_many :reviews
  has_many :protips

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      organization = Organization.find_by(name: row["Organization Name"])
      User.create(email: row["Email"],
                  password: ('a'..'z').to_a.shuffle[0,12].join,
                  organization_id: organization.id,
                  first_name: row["First Name"],
                  last_name: row["Last Name"])
    end
  end

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

  #This is a placeholder method until we decide who gets to see private reviews
  def private_review_permission
    true
  end

end
