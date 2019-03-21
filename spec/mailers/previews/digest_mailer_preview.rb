class DigestMailerPreview < ActionMailer::Preview
  def weekly_digest_email
    DigestMailer.weekly_digest_email(User.first, 1.week.ago.to_s)
  end
end
