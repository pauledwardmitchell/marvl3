require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Protips", type: :feature, js: true do

  context 'Create new protip' do

    scenario 'Should be successful' do
      organization = FactoryBot.create(:organization)
      vendor = FactoryBot.create(:vendor)
      user = FactoryBot.create(:user)

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

      login_as(user, :scope => :user)

      visit root_path
      page.find('#add-protip-button').click

      page.find('#choose-category').fill_in(with: 'Construction (Category)').native.send_keys(:return)

      page.find('#protip-title').fill_in(with: 'Test Title')
      page.find('#protip-content').fill_in(with: 'Hey before you hire in this category...')

      expect{
        page.find('#submit-protip').click
      }.to change(Protip, :count).by(1)
    end

  end
end
