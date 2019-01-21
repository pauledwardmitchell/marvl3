class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:show]


  def index
  end

  def show
    set_organization
  end

  def import
    Organization.import(params[:file])
    redirect_to root_url
  end

  private
  def set_organization
    @organization = Organization.find(params[:id])
  end

  def organization_params
    params.require(:organization).permit(:name, :website, :logo_link, :email_suffix)
  end

end
