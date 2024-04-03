Rails.application.routes.draw do

  devise_for :users
  root 'homes#top'
  get 'homes/about' => 'homes#about' ,as: "about"
  resources :post_images, only: [:new, :create,:index, :show, :destroy]
  resources :users, only: [:show, :edit]
 
end

  # get 'users/show'
  # get 'users/edit'
  # get 'post_images/new'
  # get 'post_images/index'
  # get 'post_images/show'