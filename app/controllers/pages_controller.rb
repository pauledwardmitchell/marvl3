class PagesController < ApplicationController

  skip_before_action :authenticate_user!

  def terms_and_conditions
  end

  def confirm_signout
  end

end
