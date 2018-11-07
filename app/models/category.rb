class Category < ApplicationRecord
  has_many :appearances
  has_many :super_categories, through: :appearances
  has_many :super_super_categories, through: :appearances, source: :super_categories

  has_many :offerings
  has_many :vendors, through: :offerings
  has_many :reviews, through: :vendors
  has_many :protips

  def suggestion_label
    if insurance_and_benefits_categories.include?(self.name)
      label = self.name + " (Category)"
      label
    else
      label = self.super_categories[0].name + " - " + self.name + " (Category)"
      label
    end
  end

  def full_name
    suggestion_label.chomp(" (Category)")
  end

  private

  def insurance_and_benefits_categories
    [ 'Property & Casualty Insurance Broker',
      'Retirement Benefits (Broker / Partner)',
      'Investments / 401k / 403b7',
      'Health Insurance',
      'Dental Insurance',
      'Vision Insurance',
      'Life Insurance' ]
  end
end
