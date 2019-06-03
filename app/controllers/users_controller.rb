class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:show, :update]

  def show
  end

  def update
    raise 'unauthorized' if current_user != @user

    @user.update_attributes!(user_params)
    respond_to do |format|
      format.html { redirect_to user_path(@user) }
      format.json { render json: @user }
    end
  end

  def import
    User.import(params[:file])
    redirect_to root_url
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:receives_weekly_digest)
  end
end
