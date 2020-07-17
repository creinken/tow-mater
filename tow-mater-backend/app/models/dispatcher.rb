class Dispatcher < ApplicationRecord
    has_many :tows
    has_many :drivers, through: :tows
end
