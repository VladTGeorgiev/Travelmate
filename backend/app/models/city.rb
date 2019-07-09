class City < ApplicationRecord
    has_many :landmarks
    has_many :comments, through: :landmarks
end
