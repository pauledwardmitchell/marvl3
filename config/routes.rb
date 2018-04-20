Rails.application.routes.draw do

  devise_for :users

  resources :reviews

  get '/landing_search_data', to:'apis#landing_search_data'
  get '/check_for_user', to:'apis#check_for_user'

  root to: 'reviews#index'

end
