
#BUILDING AND GROUNDS
bg = SuperSuperCategory.create( { name: 'Building and Grounds'} )

fac = SuperCategory.create( { name: 'Facilities', super_super_category_id: bg.id } )
fac_array = ['Third-Party Facilities Contracting', 'General Contracting', 'Electrician', 'Handyman', 'Plumbing', 'Locksmith', 'Painter', 'Metal Refinishing', 'Pest Control', 'Water Fountains', 'Bathroom Installations', 'Kitchen Installations', 'Gym Installations (Seating, doors, sports installations)', 'HVAC', 'Furnace / Boiler', 'Window Cleaning', 'Security Systems', 'Fire Alarm', 'Carbon Monoxide / Gas Detector', 'Signage (outdoor / indoor)', 'Cleaning', 'Landscaping / Snow Removal', 'Security Personnel']
fac_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: fac.id, category_id: cat.id)
end

furn = SuperCategory.create( { name: 'Furniture', super_super_category_id: bg.id } )
furn_array = ['For Students', 'For Classrooms', 'For Teachers', 'For Libraries', 'For Front Desk', 'For Admin Offices']
furn_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: furn.id, category_id: cat.id)
end

util = SuperCategory.create( { name: 'Utilities', super_super_category_id: bg.id } )
util_array = ['Trash Hauling', 'Electricity', 'Gas']
util_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: util.id, category_id: cat.id)
end

constr = SuperCategory.create( { name: 'Construction', super_super_category_id: bg.id } )
constr_array = [ 'General Contracting', 'Architect', 'Roofing', 'Flooring', 'Doors', 'Windows', 'Concrete', 'Drywall', 'Hardscapes', 'Fencing', 'General Contracting' ]
constr_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: constr.id, category_id: cat.id)
end

#HUMAN RESOURCES
hr = SuperSuperCategory.create( { name: 'Human Resources'} )

bene = SuperCategory.create( { name: 'Benefits / Insurance', super_super_category_id: hr.id } )
bene_array = [ 'Property & Casualty Insurance Broker', 'Retirement Benefits (Broker / Partner)', 'Investments / 401k / 403b7', 'Health Insurance', 'Dental Insurance', 'Vision Insurance', 'Life Insurance' ]
bene_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: bene.id, category_id: cat.id)
end

fin = SuperCategory.create( { name: 'Finance', super_super_category_id: hr.id } )
fin_array = [ 'Accounting Firms', 'Credit Cards' ]
fin_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: fin.id, category_id: cat.id)
end

tprodev = SuperCategory.create( { name: 'Teacher Professional Development', super_super_category_id: hr.id } )
tprodev_array = [ 'E/LA - Elementary', 'Math - Elementary', 'Science - Elementary', 'E/LA - Middle School', 'Math - Middle School', 'Science - Middle School', 'E/LA - High School', 'Math - High School', 'Science - High School', 'Art', 'Music' ]
tprodev_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: tprodev.id, category_id: cat.id)
end


#TECHNOLOGY
tech = SuperSuperCategory.create( { name: 'Technology'} )

itcon = SuperCategory.create( { name: 'IT Consulting and Support', super_super_category_id: tech.id } )
itcon_array = [ 'IT systems consulting / support' ]
itcon_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: itcon.id, category_id: cat.id)
end

itsoft = SuperCategory.create( { name: 'IT Software', super_super_category_id: tech.id } )
itsoft_array = ['Student Services / Student tracking apps', 'Grading Management Software', 'Learning Management Software', 'Mailing software', 'Accounting software', 'Contract Management Software', 'HR Platform', 'Data Management', 'Website development / maintenance', 'Hiring / Recruiting Software / Platforms', 'Visitor management systems', 'Payroll Software' ]
itsoft_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: itsoft.id, category_id: cat.id)
end

ithard = SuperCategory.create( { name: 'IT Hardware', super_super_category_id: tech.id } )
ithard_array = [ 'Security cameras', 'Telephone systems', 'Desktop computers' ]
ithard_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: ithard.id, category_id: cat.id)
end


#SUPPLIES
supp = SuperSuperCategory.create( { name: 'Supplies'} )

printm = SuperCategory.create( { name: 'Print Management', super_super_category_id: supp.id } )
printm_array = [ 'Copiers', 'Copies printed off-site', 'Banners', 'Promotional materials' ]
printm_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: printm.id, category_id: cat.id)
end

sports = SuperCategory.create( { name: 'Sports Supplies', super_super_category_id: supp.id } )
sports_array = [ 'Uniforms', 'Sports equipment', 'Used / donated sports equipment' ]
sports_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: sports.id, category_id: cat.id)
end

nslp = SuperCategory.create( { name: 'National School Lunch Program', super_super_category_id: supp.id } )
nslp_array = [ 'Food vendors' ]
nslp_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: nslp.id, category_id: cat.id)
end

off = SuperCategory.create( { name: 'Office needs', super_super_category_id: supp.id } )
off_array = [ 'Office supplies', 'Scanning and shredding', 'Postage meters' ]
off_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: off.id, category_id: cat.id)
end


#STUDENT INSTRUCTION / STUDENT SERVICES
ss = SuperSuperCategory.create( { name: 'Student Instruction / Student Services'} )

curric = SuperCategory.create( { name: 'Curriculum Resources', super_super_category_id: ss.id } )
curric_array = [ 'E/LA - Elementary', 'Math - Elementary', 'Science - Elementary', 'E/LA - Middle School', 'Math - Middle School', 'Science - Middle School', 'E/LA - High School', 'Math - High School', 'Science - High School' ]
curric_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: curric.id, category_id: cat.id)
end

iit = SuperCategory.create( { name: 'Instructional Technology', super_super_category_id: ss.id } )
iit_array = [ 'Laptops', 'Chromebooks', 'iPads', 'Document cameras', 'STEM hardware' ]
iit_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: iit.id, category_id: cat.id)
end

apps = SuperCategory.create( { name: 'Instructional Apps', super_super_category_id: ss.id } )
apps_array = [ 'E/LA apps', 'Math apps', 'Science apps', 'Social Studies apps' ]
apps_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: apps.id, category_id: cat.id)
end

sss = SuperCategory.create( { name: 'Student Support Services', super_super_category_id: ss.id } )
sss_array = ['Special Education services', 'Counselling services', 'Speech pathologists', 'Other health services', 'Services for families']
sss_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: sss.id, category_id: cat.id)
end

uni = SuperCategory.create( { name: 'Uniforms', super_super_category_id: ss.id } )
uni_array = [ 'Elementary school', 'Middle school', 'High school', 'Sports' ]
uni_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: uni.id, category_id: cat.id)
end

fam = SuperCategory.create( { name: 'Family Services', super_super_category_id: ss.id } )
fam_array = [ 'Digital platforms to engage parents and families', 'Resources for families' ]
fam_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: fam.id, category_id: cat.id)
end

trans = SuperCategory.create( { name: 'Transportation', super_super_category_id: ss.id } )
trans_array = [ 'School buses', 'Charter buses']
trans_array.each do |c|
  cat = Category.create( { name: c })
  Appearance.create( super_category_id: trans.id, category_id: cat.id)
end


##VENDORS, OFFERINGS, and REVIEWS
10.times do
  vendor = Vendor.create( name: "Mock Vendor")
  Offering.create( category_id: 1, vendor_id: vendor.id )

  30.times do
    Review.create( user_id: 1, vendor_id: [1,2,3,4,5,6,7,8,9,10].sample, review_content: "Ipsum lorem", rating_service: 5, rating_quality: 5)
  end

end




