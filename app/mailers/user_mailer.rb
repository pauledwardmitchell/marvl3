class UserMailer < ApplicationMailer
  def confirmed_email(user)
    mail(to: user.email, subject: 'Your MARVL account is confirmed')
  end
end
