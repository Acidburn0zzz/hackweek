class User < ActiveRecord::Base
  attr_accessible :email, :name, :uid
  
  has_many :projects, :foreign_key => 'originator_id'
  
  include Gravtastic
  has_gravatar
end
