Rails.application.routes.draw do

  devise_for :users
  root 'homes#top'
  get 'homes/about' => 'homes#about' ,as: "about"
  resources :post_images, only: [:new, :create,:index, :show, :destroy] do
    resources :post_comments, only: [:create, :destroy]
    resource :favorite, only: [:create, :destroy]
  end

  resources :users, only: [:show, :edit, :update]

end

  # get 'users/show'
  # get 'users/edit'
  # get 'post_images/new'
  # get 'post_images/index'
  # get 'post_images/show'