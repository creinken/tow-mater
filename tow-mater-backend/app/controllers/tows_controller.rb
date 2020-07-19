class TowsController < ApplicationController

    def index
        tows = Tow.all
        render json: tows, include: [:driver, :dispatcher]
    end
end
