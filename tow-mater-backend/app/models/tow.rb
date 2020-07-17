class Tow < ApplicationRecord
    belongs_to :driver
    belongs_to :dispatcher
end
