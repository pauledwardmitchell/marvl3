Rails.application.routes.draw do

  devise_for :users

  resources :reviews
  resources :categories
  resources :vendors
  resources :users
  resources :organizations

  get '/landing_search_data', to:'apis#landing_search_data'
  get '/check_for_user', to:'apis#check_for_user'

  root to: 'reviews#index'

end
