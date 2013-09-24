require 'test_helper'

class ApiControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  def setup
    sign_in :user, User.find('1')
  end
  
  test "import" do
    
    json = <<EOT
{
  "projects": [
    {
      "title": "GitCool",
      "description": "Here will be a description."
    },
    {
      "title": "Github-Pages-Jekyll-Templates",
      "description": "Here will be a description."
    },
    {
      "title": "Dashoid",
      "description": "Here will be a description."
    }
  ]
}
EOT

    assert_difference('Project.count', +3 ) do
      request.env["CONTENT_TYPE"] = "application/json"
      request.env["RAW_POST_DATA"]  = json
      post :import
      assert_response :success
    end
    
  end

end
