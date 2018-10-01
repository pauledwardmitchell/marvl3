Rails.application.routes.draw do

  devise_for :users

  resources :reviews
  resources :categories
  resources :vendors
  resources :users
  resources :organizations

#App Bar
  get '/check_for_user', to:'apis#check_for_user'

#Landing Page
  get '/landing_search_data', to:'apis#landing_search_data'
  get '/landing_schools_data', to:'apis#landing_schools_data'

#Org Show
  get '/org_show_data', to: 'apis#org_show_data'

  get '/building_and_grounds', to: 'apis#building_and_grounds'
  get '/human_resources', to: 'apis#human_resources'
  get '/technology', to: 'apis#technology'
  get '/supplies', to: 'apis#supplies'
  get '/student_instruction_and_services', to: 'apis#student_instruction_and_services'

  root to: 'reviews#index'

end
