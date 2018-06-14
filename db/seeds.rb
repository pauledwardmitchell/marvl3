
#BUILDING AND GROUNDS
bg = SuperSuperCategory.create( { name: 'Building and Grounds'} )

fac = SuperCategory.create( { name: 'Facilities', super_super_category_id: bg.id } )
fac_array = ['Third-Party Facilities Contracting', 'General Contracting', 'Electrician', 'Handyman', 'Plumbing', 'Locksmith', 'Painter', 'Metal Refinishing', 'Pest Control', 'Water Fountains', 'Bathroom Installations', 'Kitchen Installations', 'Gym Installations (Seating, doors, sports installations)', 'HVAC', 'Furnace / Boiler', 'Window Cleaning', 'Security Systems', 'Fire Alarm', 'Carbon Monoxide / Gas Detector', 'Signage (outdoor / indoor)', 'Cleaning', 'Landscaping / Snow Removal', 'Security Personnel']
fac_array.each do |c|
  Category.create( { name: c, super_category_ids: [ fac.id ]})
end

furn = SuperCategory.create( { name: 'Furniture', super_super_category_id: bg.id } )
furn_array = ['For Students', 'For Classrooms', 'For Teachers', 'For Libraries', 'For Front Desk', 'For Admin Offices']
furn_array.each do |c|
  Category.create( { name: c, super_category_ids: [ furn.id ]})
end

util = SuperCategory.create( { name: 'Utilities', super_super_category_id: bg.id } )
util_array = ['Trash Hauling', 'Electricity', 'Gas']
util_array.each do |c|
  Category.create( { name: c, super_category_ids: [ util.id ]})
end

constr = SuperCategory.create( { name: 'Construction', super_super_category_id: bg.id } )
constr_array = [ 'General Contracting', 'Architect', 'Roofing', 'Flooring', 'Doors', 'Windows', 'Concrete', 'Drywall', 'Hardscapes', 'Fencing', 'General Contracting' ]
constr_array.each do |c|
  Category.create( { name: c, super_category_ids: [ constr.id ]})
end

#HUMAN RESOURCES
hr = SuperSuperCategory.create( { name: 'Human Resources'} )

bene = SuperCategory.create( { name: 'Benefits / Insurance', super_super_category_id: hr.id } )
bene_array = [ 'Property & Casualty Insurance Broker', 'Retirement Benefits (Broker / Partner)', 'Investments / 401k / 403b7', 'Health Insurance', 'Dental Insurance', 'Vision Insurance', 'Life Insurance' ]
bene_array.each do |c|
  Category.create( { name: c, super_category_ids: [ bene.id ]})
end

fin = SuperCategory.create( { name: 'Finance', super_super_category_id: hr.id } )
fin_array = [ 'Accounting Firms', 'Credit Cards' ]
fin_array.each do |c|
  Category.create( { name: c, super_category_ids: [ fin.id ]})
end


tprodev = SuperCategory.create( { name: 'Teacher Professional Development', super_super_category_id: hr.id } )
tprodev_array = [ 'E/LA - Elementary', 'Math - Elementary', 'Science - Elementary', 'E/LA - Middle School', 'Math - Middle School', 'Science - Middle School', 'E/LA - High School', 'Math - High School', 'Science - High School', 'Art', 'Music' ]
tprodev_array.each do |c|
  Category.create( { name: c, super_category_ids: [ tprodev.id ]})
end


#TECHNOLOGY
tech = SuperSuperCategory.create( { name: 'Technology'} )

itcon = SuperCategory.create( { name: 'IT Consulting and Support', super_super_category_id: tech.id } )
itcon_array = [ 'IT systems consulting / support' ]
itcon_array.each do |c|
  Category.create( { name: c, super_category_ids: [ itcon.id ]})
end

itsoft = SuperCategory.create( { name: 'IT Software', super_super_category_id: tech.id } )
itsoft_array = ['Student Services / Student tracking apps', 'Grading Management Software', 'Learning Management Software', 'Mailing software', 'Accounting software', 'Contract Management Software', 'HR Platform', 'Data Management', 'Website development / maintenance', 'Hiring / Recruiting Software / Platforms', 'Visitor management systems', 'Payroll Software' ]
itsoft_array.each do |c|
  Category.create( { name: c, super_category_ids: [ itsoft.id ]})
end

ithard = SuperCategory.create( { name: 'IT Hardware', super_super_category_id: tech.id } )
ithard_array = [ 'Security cameras', 'Telephone systems', 'Desktop computers' ]
ithard_array.each do |c|
  Category.create( { name: c, super_category_ids: [ ithard.id ]})
end


#SUPPLIES
supp = SuperSuperCategory.create( { name: 'Supplies'} )

printm = SuperCategory.create( { name: 'Print Management', super_super_category_id: supp.id } )
printm_array = [ 'Copiers', 'Copies printed off-site', 'Banners', 'Promotional Materials' ]
printm_array.each do |c|
  Category.create( { name: c, super_category_ids: [ printm.id ]})
end

sports = SuperCategory.create( { name: 'Sports Supplies', super_super_category_id: supp.id } )
sports_array = [ 'Uniforms', 'Sports Equipment', 'Used / donated sports equipment' ]
sports_array.each do |c|
  Category.create( { name: c, super_category_ids: [ sports.id ]})
end

nslp = SuperCategory.create( { name: 'National School Lunch Program', super_super_category_id: supp.id } )
nslp_array = [ 'Food vendors' ]
nslp_array.each do |c|
  Category.create( { name: c, super_category_ids: [ nslp.id ]})
end

off = SuperCategory.create( { name: 'Office needs', super_super_category_id: supp.id } )
off_array = [ 'Office supplies', 'Scanning and Shredding', 'Postage meters' ]
off_array.each do |c|
  Category.create( { name: c, super_category_ids: [ off.id ]})
end


#STUDENT INSTRUCTION / STUDENT SERVICES
ss = SuperSuperCategory.create( { name: 'Student Instruction / Student Services'} )

