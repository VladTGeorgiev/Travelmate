class User < ApplicationRecord
    has_many :comments
    validates :username, presence: true
    validates :username, uniqueness: true
end
