FactoryBot.define do
  factory :organization do
    name { 'Good School' }
    website { 'www.gs.com' }
    logo_link { 'www.gs.com/picture'}
    email_suffix { 'gs.com' }
  end

  factory :vendor do
    name { 'Good Vendor' }
  end

  factory :category do
    name { 'Construction' }
  end

  factory :user do
    email { 'test@example.com' }
    password { 'f4k3p455w0rd' }
    password_confirmation { 'f4k3p455w0rd' }
    organization_id { 1 }
    first_name { 'john' }
    last_name { 'doe' }
  end

end
