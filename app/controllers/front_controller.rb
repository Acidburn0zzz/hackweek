class FrontController < ApplicationController
  
  skip_before_filter :authenticate_user! 
  
  layout "front"

  def index
  end
  
  def awards
    render :layout => "application"
  end

  def howto
    render :layout => "application"
  end

  def news
    render :layout => "application"
  end
end
