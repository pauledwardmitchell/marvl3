class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]

  def show
  end

  private
  def set_user
    @organization = Organization.find(params[:id])
  end

end
