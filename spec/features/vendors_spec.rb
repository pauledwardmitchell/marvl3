require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Vendors", type: :feature, js: true do

  context 'Create new vendor' do

    scenario 'Should be successful' do
      num_vendors_before = Vendor.all.count
      num_point_people_before = PointPerson.all.count

      user = FactoryBot.build(:user)
      user.save(:validate => false)
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


