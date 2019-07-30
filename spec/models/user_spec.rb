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

    it 'ensures association to organization' do
      organization = FactoryBot.create(:organization)
      user = User.new(first_name: 'First',
                      last_name: 'Last',
                      email: 'example@gs.com',
                      password: 'f4k3p455w0rd',
                      password_confirmation: 'f4k3p455w0rd').save
      expect(user).to eq(false)
    end

  end

  context 'distinguishes between CPA staff and other users' do
    let!(:params) { { first_name: 'First',
                      last_name: 'Last',
                      password: 'f4k3p455w0rd',
                      password_confirmation: 'f4k3p455w0rd' } }

    it 'returns true for CPA staff' do
      organization = FactoryBot.create(:organization)
      user = User.new(params.merge(email: 'paul@cpa.coop', organization_id: organization.id))
      expect(user.is_cpa_staff).to eq(false)
    end

    it 'returns false for non CPA staff' do
      organization = FactoryBot.create(:organization)
      user = User.new(params.merge(email: 'paul@gs.com', organization_id: organization.id))
      expect(user.is_cpa_staff).to eq(false)
    end
  end

  context 'returns points for MARVL activity' do
    let!(:user_params) { { first_name: 'First',
                           last_name: 'Last',
                           password: 'f4k3p455w0rd',
                           password_confirmation: 'f4k3p455w0rd' } }

    it 'returns zero for no activity' do
      organization = FactoryBot.create(:organization)
      user = User.new(user_params.merge(email: 'paul@gs.com', organization_id: organization.id))
      expect(user.points).to eq(0)
    end

    it 'returns non-zero number for user with activity' do
      organization = FactoryBot.create(:organization)
      user = User.create(user_params.merge(email: 'paul@gs.com', organization_id: organization.id, confirmed_at: DateTime.now))
      vendor = FactoryBot.create(:vendor)
      FactoryBot.create(:super_super_category, :bg)
      super_category = FactoryBot.create(:super_category)
      category = FactoryBot.create(:category)
      appearance = FactoryBot.create(:appearance)
      review = Review.create(
          user_id: user.id,
          vendor_id: vendor.id,
          category_id: category.id,
          review_content: "Public review blah blah",
          review_private_content: "Private review blahbadiblah",
          rating: 4
          )
      expect(user.points).to be > 0
    end
  end

end
