require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Vendors", type: :feature, js: true do

  context 'Create new vendor' do

    scenario 'Should be successful' do
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
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)

      login_as(user, :scope => :user)

      visit root_path
      click_button('Add Vendor')

      page.find('#vendor-name').fill_in(with: 'Good Vendor')
      page.find('#vendor-website').fill_in(with: 'www.goodvendor.com')
      page.find('#vendor-street-address').fill_in(with: '123 Good Vendor Way')
      page.find('#vendor-city-state-zip').fill_in(with: 'Chicago, IL 12345')
      page.find('#point-person-name').fill_in(with: 'John Doe')
      page.find('#point-person-phone').fill_in(with: '(123) 432-2345')
      page.find('#point-person-email').fill_in(with: 'jdoe@email.com')

      expect{
        page.find('#submit').click
      }.to change(Vendor, :count).by(1)
    end

  end
end


