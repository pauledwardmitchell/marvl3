class DigestMailer < ApplicationMailer
  def weekly_digest_email(user, since)
    since = Time.zone.parse(since)
    @users = created_since(User, since)
    @vendors = created_since(Vendor, since)
    @reviews = created_since(Review, since)
    @protips = created_since(Protip, since)
    mail(to: user.email, subject: 'Weekly Digest')
  end

  private

  def created_since(model, since)
    model.where('created_at > ?', since)
  end
end
