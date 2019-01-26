require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Navigation: ", type: :feature, js: true do

  context 'follow links to every view in app ' do

    scenario 'should be successful' do
      organization = FactoryBot.create(:organization)
      vendor = FactoryBot.create(:vendor)
      user = FactoryBot.create(:user)

      FactoryBot.create(:super_super_category, :bg)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      bg_category = category
      review = FactoryBot.create(:review)
      binding.pry
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
      page.find('#building-and-grounds-container').click
      page.find('#category-title-'+bg_category.id.to_s).click
binding.pry

      expect(page).to have_content 'use email affiliated with member school'

    end

  end
end
