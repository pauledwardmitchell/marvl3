class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  validate :is_charter_member

  belongs_to :organization
  has_many :reviews
  has_many :protips

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      organization = Organization.find_by(name: row["Organization Name"].strip)
      User.create(email: row["Email"].strip,
                  password: ('a'..'z').to_a.shuffle[0,12].join,
                  organization_id: organization.id,
                  first_name: row["First Name"].strip,
                  last_name: row["Last Name"].strip,
                  title: row["Title"].strip,
                  confirmed_at: DateTime.now)
    end
  end

  def is_charter_member
    if !member_email_suffixes.include? self.email.split("@").last
      errors.add(:member_email, "use email affiliated with member school")
    end
  end

  def is_cpa_staff
    if self.organization.email_suffix == "cpa.coop"
      true
    else
      false
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
    points = 0

    if !self.reviews.empty?
      points += self.reviews.map { |r| r.points }.reduce(:+)
    end

    if !self.protips.empty?
      points += self.protips.map { |r| p.points }.reduce(:+)
    end

    points
  end

  private

  def member_email_suffixes
    Organization.all.map { |o| o.email_suffix }
  end

  # Send Devise emails in the background
  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end
end
