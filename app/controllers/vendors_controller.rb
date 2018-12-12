class VendorsController < ApplicationController
  before_action :set_vendor, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:show]

  def index
  end

  def show
    set_vendor
  end

  def create
    @vendor = Vendor.new(vendor_params)
    if @vendor.save
      render json: @vendor
    else
      render json: @vendor.errors, status: :unprocessable_entity
    end
  end

  private
  def set_vendor
    @vendor = Vendor.find(params[:id])
  end

  def vendor_params
    params.require(:vendor).permit(:name, :website, :street, :city_state_and_zip, :main_phone_line)
  end

end
