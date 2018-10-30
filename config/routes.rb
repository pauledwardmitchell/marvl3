Rails.application.routes.draw do

  devise_for :users

  resources :reviews
  resources :categories
  resources :vendors
  resources :users
  resources :organizations

#App Bar
  get '/check_for_user', to:'apis#check_for_user'
  get '/search_vendors_suggestions', to: 'apis#search_vendors_suggestions'
  get '/search_categories_suggestions', to: 'apis#search_categories_suggestions'
  get '/existing_vendors', to: 'apis#existing_vendors'
  post '/vendor_payload', to: 'apis#vendor_payload'

#Landing Page
  get '/landing_search_data', to:'apis#landing_search_data'
  get '/landing_schools_data', to:'apis#landing_schools_data'
  get '/landing_recent_activity_data', to: 'apis#landing_recent_activity_data'

#Org Show
  get '/org_show_data', to: 'apis#org_show_data'

#Vendor Show
  get '/vendor_show_data', to: 'apis#vendor_show_data'
  get '/vendor_show_reviews_data', to: 'apis#vendor_show_reviews_data'

#Category Show
  get '/category_show_data', to: 'apis#category_show_data'

#Taxonomy
  get '/building_and_grounds', to: 'apis#building_and_grounds'
  get '/human_resources', to: 'apis#human_resources'
  get '/technology', to: 'apis#technology'
  get '/supplies', to: 'apis#supplies'
  get '/student_instruction_and_services', to: 'apis#student_instruction_and_services'

#Uploads
  get '/upload', to: 'reviews#upload'
  post '/import_reviews', to: 'reviews#import'

  root to: 'reviews#index'

end
