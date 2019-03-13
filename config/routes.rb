Rails.application.routes.draw do

  devise_for :users

  resources :reviews
  resources :categories
  resources :point_people
  resources :vendors
  resources :users
  resources :organizations
  resources :protips

#Sign up
  get '/signup_schools_suggestions', to:'apis#signup_schools_suggestions'

#App Bar
  get '/check_for_user', to:'apis#check_for_user'
  get '/search_vendors_suggestions', to: 'apis#search_vendors_suggestions'
  get '/search_categories_suggestions', to: 'apis#search_categories_suggestions'
  get '/existing_vendors', to: 'apis#existing_vendors'

#Landing Page
  get '/landing_search_data', to:'apis#landing_search_data'
  get '/landing_schools_data', to:'apis#landing_schools_data'
  get '/landing_recent_activity_data', to: 'apis#landing_recent_activity_data'
  get '/landing_popular_categories', to: 'apis#landing_popular_categories'

#Org Show
  get '/org_show_data', to: 'apis#org_show_data'

#Review Show
  get '/review_show_data', to: 'apis#review_show_data'

#User Show
  get '/user_show_data', to: 'apis#user_show_data'

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
  post '/import_organizations', to: 'organizations#import'
  post '/import_users', to: 'users#import'
  post '/import_categories', to: 'categories#import'
  post '/import_reviews', to: 'reviews#import'
  post '/import_vendors', to: 'vendors#import'

#Pages
  get 'terms_and_conditions', to: 'pages#terms_and_conditions'

  root to: 'reviews#index'

end
