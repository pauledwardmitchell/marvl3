class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:show]

  def show
  end

  def import
    User.import(params[:file])
    redirect_to root_url
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

end
