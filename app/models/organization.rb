class Organization < ApplicationRecord
  has_many :users

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      Organization.create(name: row["Organization Name"],
                          website: row["Website"],
                          logo_link: row["Logo Link"])
    end
  end
end
