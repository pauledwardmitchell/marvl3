FactoryBot.define do
  factory :organization do
    name { 'Good School' }
    website { 'www.gs.com' }
    logo_link { 'https://pbs.twimg.com/profile_images/1595191063/CCPCS-logo-icon-CMYK_WEB_400x400.gif' }
    email_suffix { 'gs.com' }
  end

  factory :vendor do
    name { 'Good Vendor' }
  end

  factory :super_super_category do
    name { 'Building and Grounds' }
  end

  factory :super_category do
    name { 'Facilities' }
    super_super_category_id { SuperSuperCategory.last.id }
  end

  factory :category do
    name { 'Construction' }
  end

  factory :appearance do
    super_category_id { SuperCategory.last.id }
    category_id { Category.last.id }
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
