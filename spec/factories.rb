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
    trait :bg do
      name { 'Facilities' }
    end
    trait :hr do
      name { 'Human Resources' }
    end
    trait :tech do
      name { 'Technology' }
    end
    trait :supplies do
      name { 'Supplies' }
    end
    trait :ss do
      name { 'Student Instruction and Student Services' }
    end

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

  factory :review do
    user_id { User.last.id }
    vendor_id { Vendor.last.id }
    category_id { Category.last.id }
    review_content { "Public review blah blah"}
    review_private_content { "Private review blahbadiblah" }
    rating { 4 }
  end

  factory :user do
    email { 'test@gs.com' }
    password { 'f4k3p455w0rd' }
    password_confirmation { 'f4k3p455w0rd' }
    organization_id { Organization.last.id }
    first_name { 'john' }
    last_name { 'doe' }
    confirmed_at { DateTime.now }
  end

end
