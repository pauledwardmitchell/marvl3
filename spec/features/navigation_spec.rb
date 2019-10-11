require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Navigation: ", type: :feature, js: true do

  context 'follow links to every view in app ' do

    scenario 'should be successful' do
      organization = FactoryBot.create(:organization)
      vendor = FactoryBot.create(:vendor)
      user = FactoryBot.create(:user, email: 'test@gs.com')

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
      page.find('#building-and-grounds-container').click
      page.find('#category-title-'+bg_category.id.to_s).click
      page.find('#vendor-page-button-'+vendor.id.to_s).click
      page.find('#home-button').click
      page.find('#review-button-'+review.id.to_s).click
      page.find('#home-button').click

      expect(page).to have_content "Browse vendors of network schools"

    end

  end
end
