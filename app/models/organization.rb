class Organization < ApplicationRecord
  has_many :users

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      Organization.create(name: row["Organization Name"].strip,
                          website: row["Website"].strip,
                          logo_link: row["Logo Link"].strip,
                          email_suffix: row["Email Suffix"].strip)
    end
  end

  def points
    if self.users.map{ |u| u.points }.inject(:+) != nil
      return self.users.map{ |u| u.points }.inject(:+)
    else
      return 0
    end
  end
end
