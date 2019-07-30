require 'rails_helper'

RSpec.describe User, type: :model do

  context 'validation tests' do

    it 'ensures first name presence' do
      organization = FactoryBot.create(:organization)
      user = User.new(last_name: 'Last',
                      email: 'example@gs.com',
                      password: 'f4k3p455w0rd',
                      password_confirmation: 'f4k3p455w0rd',
                      organization_id: organization.id).save
      expect(user).to eq(false)
    end

    it 'ensures last name presence' do
      organization = FactoryBot.create(:organization)
      user = User.new(first_name: 'First',
                      email: 'example@gs.com',
                      password: 'f4k3p455w0rd',
                      password_confirmation: 'f4k3p455w0rd',
                      organization_id: organization.id).save
      expect(user).to eq(false)
    end

    it 'ensures email presence' do
      organization = FactoryBot.create(:organization)
      user = User.new(first_name: 'First',
                      last_name: 'Last',
                      password: 'f4k3p455w0rd',
                      password_confirmation: 'f4k3p455w0rd',
                      organization_id: organization.id).save
      expect(user).to eq(false)
    end

    it 'ensures charter member email presence' do
      organization = FactoryBot.create(:organization)
      user = User.new(first_name: 'First',
                      last_name: 'Last',
                      email: 'abc@gmail.com',
                      password: 'f4k3p455w0rd',
                      password_confirmation: 'f4k3p455w0rd',
                      organization_id: organization.id).save
      expect(user).to eq(false)
    end

  end

end
