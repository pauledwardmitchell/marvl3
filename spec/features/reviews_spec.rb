require 'rails_helper'
require 'capybara/rails'

RSpec.feature "Reviews", type: :feature, js: true do

  context 'Create new review' do

    scenario 'Should be successful' do
      user = FactoryBot.build(:user)
      user.save(:validate => false)
      login_as(user, :scope => :user)


      visit root_path
      # wait_for_ajax
      expect(page).to have_content("Write Review")
      click_button('Write Review')
      # page.find('WRITE REVIEW').click
      expect(page).to have_content("Write a review")
      # click_button('GO')
      # within('form') do
      # end
      # click_button('Submit')
    end

  end
end


