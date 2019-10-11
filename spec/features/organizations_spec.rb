require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Organizations", type: :feature, js: true do

  context 'Display only active users for an organization' do

    scenario 'Inactive users should not appear' do
      organization = FactoryBot.create(:organization)
      vendor = FactoryBot.create(:vendor)
      user = FactoryBot.create(:user, email: 'test@gs.com', active: true)
      inactive_user = FactoryBot.create(:user, email: 'inactive_test@gs.com', active: false)

      FactoryBot.create(:super_super_category, :bg)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      bg_category = category
      bg_review = FactoryBot.create(:review)
      FactoryBot.create(:super_super_category, :hr)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      review = FactoryBot.create(:review)
      FactoryBot.create(:super_super_category, :tech)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      review = FactoryBot.create(:review)
      FactoryBot.create(:super_super_category, :supplies)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      review = FactoryBot.create(:review)
      FactoryBot.create(:super_super_category, :ss)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      review = FactoryBot.create(:review)

      login_as(user, :scope => :user)

      visit root_path
      page.find('#grid-list-link-'+organization.id.to_s).click

      expect(page).not_to have_content "inactive_test@gs.com"
    end

  end
end
