namespace :digest do
  task send: :environment do
    now = Time.now
    if now.monday? and (now.month == 1 or now.month == 7 or now.month == 10)
      thirteen_weeks_ago = 13.week.ago
      User.receives_weekly_digest.find_each do |user|
        DigestMailer.weekly_digest_email(user, thirteen_weeks_ago.to_s).deliver_later
      end
    end
  end
end
