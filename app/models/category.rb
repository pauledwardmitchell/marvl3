class Category < ApplicationRecord
  has_many :appearances
  has_many :super_categories, through: :appearances
  has_many :super_super_categories, through: :appearances, source: :super_categories

  # has_many :offerings
  has_many :reviews
  has_many :vendors, through: :reviews
  has_many :protips

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|

      if !SuperSuperCategory.find_by(name: row["Super Super Category Name"].strip)
        SuperSuperCategory.create(name: row["Super Super Category Name"].strip)
      end
      super_super_category = SuperSuperCategory.find_by(name: row["Super Super Category Name"].strip)

      if !SuperCategory.find_by(name: row["Super Category Name"].strip)
        SuperCategory.create(name: row["Super Category Name"].strip,
                             super_super_category_id: super_super_category.id)
      end
      super_category = SuperCategory.find_by(name: row["Super Category Name"].strip)

      if !Category.find_by(name: row["Category Name"].strip)
        Category.create(name: row["Category Name"].strip)
      end
      category = Category.find_by(name: row["Category Name"].strip)

      Appearance.create(super_category_id: super_category.id,
                        category_id: category.id)
    end
  end

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
