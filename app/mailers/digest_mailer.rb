class DigestMailer < ApplicationMailer
  def weekly_digest_email(user, since)
    since = Time.zone.parse(since)
    @users = created_since(User, since)
    @vendors = created_since(Vendor, since)
    @reviews = created_since(Review, since)
    @protips = created_since(Protip, since)
    @ranking_array = create_ranking_array
    mail(to: user.email, subject: 'Your MARVL Quarterly Digest!')
  end

  private

  def created_since(model, since)
    model.where('created_at > ?', since)
  end

  def create_ranking_array
    ranking_array = []
    Organization.all.map do |o|
      org_hash = {
        name: o.name,
        points: o.points
      }
      ranking_array << org_hash
    end
    sorted_ranking_array = ranking_array.sort_by {|a| a[:points]}.reverse.take(10)
    sorted_ranking_array
  end

end
