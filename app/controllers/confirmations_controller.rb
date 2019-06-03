class ConfirmationsController < Devise::ConfirmationsController
  def show
    super do |user|
      if user.errors.empty?
        UserMailer.confirmed_email(user).deliver_later
      end
    end
  end
end
