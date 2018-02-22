Rails.application.routes.draw do

  devise_for :users

  resources :reviews

  get '/landing_search_data', to:'apis#landing_search_data'

  root to: 'reviews#index'

end
