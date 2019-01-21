# module WaitForAjax
#   def wait_for_ajax
#     Timeout.timeout(Capybara.default_max_wait_time) do
#       loop until page_loaded?
#     end
#   end

#   def page_loaded?
#     page.has_content('MARVL')
#   end
# end

# RSpec.configure do |config|
#   config.include WaitForAjax, type: :feature
# end
