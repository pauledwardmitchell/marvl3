require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Categories", type: :feature, js: true do

  context 'Category Show Page' do

    scenario 'Preferred vendors should render with star badge' do

      organization = FactoryBot.create(:organization)
      user = FactoryBot.create(:user, email: 'test@gs.com')

      FactoryBot.create(:super_super_category, :bg)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      bg_category = category
      FactoryBot.create(:super_super_category, :hr)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      FactoryBot.create(:super_super_category, :tech)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      FactoryBot.create(:super_super_category, :supplies)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      FactoryBot.create(:super_super_category, :ss)
      super_category = FactoryBot.create(:super_category)
      last_category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)

      vendor = FactoryBot.create(:vendor, preferred: true)
      review = Review.create(vendor_id: vendor.id, category_id: last_category.id, user_id: user.id, review_content: 'abc', rating: 3)

      login_as(user, :scope => :user)

      visit('/categories/'+last_category.id.to_s)

      expect(page).to have_css '.preferred'

    end

    scenario 'Non-Preferred vendors should not render with star badge' do

      organization = FactoryBot.create(:organization)
      user = FactoryBot.create(:user, email: 'test@gs.com')

      FactoryBot.create(:super_super_category, :bg)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      bg_category = category
      FactoryBot.create(:super_super_category, :hr)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      FactoryBot.create(:super_super_category, :tech)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      FactoryBot.create(:super_super_category, :supplies)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      FactoryBot.create(:super_super_category, :ss)
      super_category = FactoryBot.create(:super_category)
      last_category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)

      vendor = FactoryBot.create(:vendor, preferred: false)
      review = Review.create(vendor_id: vendor.id, category_id: last_category.id, user_id: user.id, review_content: 'abc', rating: 3)

      login_as(user, :scope => :user)

      visit('/categories/'+last_category.id.to_s)

      expect(page).not_to have_css '.preferred'

    end

  end

end


