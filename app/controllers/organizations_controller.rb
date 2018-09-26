class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]

  def index
  end

  def show
    set_organization
  end

  private
  def set_organization
    @organization = Organization.find(params[:id])
  end

end
