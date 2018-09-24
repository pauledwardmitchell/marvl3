Rails.application.routes.draw do

  devise_for :users

  resources :reviews
  resources :categories
  resources :vendors
  resources :users
  resources :organizations

  get '/landing_search_data', to:'apis#landing_search_data'
  get '/check_for_user', to:'apis#check_for_user'
  get '/building_and_grounds', to: 'apis#building_and_grounds'
  get '/human_resources', to: 'apis#human_resources'

  root to: 'reviews#index'

end
