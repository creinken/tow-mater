class Driver < ApplicationRecord
    has_many :tows
    has_many :dispatchers, through: :tows
end
