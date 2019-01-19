class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validate :is_charter_member

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

  def is_charter_member
    if !member_email_suffixes.include? self.email.split("@").last
      errors.add(:member_email, "use email affiliated with member school")
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

  private

  def member_email_suffixes
    #Change this to dynamoic look up when it is a column on the user model
    [ "appletreeinstitute.org",
      "briya.org",
      "ccpcs.org",
      "chavezschools.org",
      "dcprep.org",
      "elhaynes.org",
      "friendshipschools.org",
      "ideapcs.org",
      "kippdc.org",
      "seeforever.org",
      "mpcs-dc.org",
      "paulcharter.org",
      "pspdc.org",
      "rocketshipschools.org",
      "thurgoodmarshallacademy.org",
      "tworiverspcs.org",
      "washingtonyuying.org" ]
  end

end
