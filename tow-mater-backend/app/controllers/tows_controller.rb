class TowsController < ApplicationController

    def index
        tows = Tow.all
        render json: tows, include: [:driver, :dispatcher]
    end

    def create
        driver = Driver.find_or_create_by(name: params[:tow][:driver])
        dispatcher = Dispatcher.find_or_create_by(name: params[:tow][:dispatcher])
        tow = Tow.create(tow_params)
        tow.driver = driver
        tow.dispatcher = dispatcher
        tow.save

        render json: tow, include: [:driver, :dispatcher]
    end

    private

    def tow_params
        params.require(:tow).permit(:tow_type, :subtype)
    end
end
