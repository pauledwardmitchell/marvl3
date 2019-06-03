namespace :digest do
  task send: :environment do
    if Time.now.monday?
      week_ago = 1.week.ago
      User.receives_weekly_digest.find_each do |user|
        DigestMailer.weekly_digest_email(user, week_ago.to_s).deliver_later
      end
    end
  end
end
