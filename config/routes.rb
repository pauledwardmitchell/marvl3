Rails.application.routes.draw do
  resources :reviews

  get '/landing_search_data', to:'api#landing_search_data'

end
