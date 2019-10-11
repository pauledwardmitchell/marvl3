require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Reviews", type: :feature, js: true do

  context 'Create new review' do

    scenario 'Should be successful' do
      organization = FactoryBot.create(:organization)
      user = FactoryBot.create(:user, email: 'test@gs.com')
      vendor = FactoryBot.create(:vendor)

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
      page.find('#write-review-button').click

      page.find('#choose-vendor').fill_in(with: 'Good Vendor').native.send_keys(:return)
      page.find('#choose-category').fill_in(with: 'Construction').native.send_keys(:return)

      page.find('#public-review').fill_in(with: 'Public review...')
      page.find('#private-review').fill_in(with: 'Private review...')

      expect{
        page.find('#submit-review').click
      }.to change(Review, :count).by(1)
    end

  end
end
