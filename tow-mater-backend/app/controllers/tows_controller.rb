class TowsController < ApplicationController
    before_action :get_driver_and_dispatcher, only: [:create, :update]

    def index
        tows = Tow.all
        render json: tows, include: [:driver, :dispatcher]
    end

    def create
        tow = Tow.create(tow_params)
        tow.driver = @driver
        tow.dispatcher = @dispatcher
        tow.save

        render json: tow, include: [:driver, :dispatcher]
    end

    def update
        tow = Tow.find_by(id: params[:id])
        tow.driver = @driver
        tow.dispatcher = @dispatcher
        tow.update(tow_params)
        
        render json: {:message => {"update successful"}}
    end

    private

    def get_driver_and_dispatcher
        @driver = Driver.find_or_create_by(name: params[:tow][:driver])
        @dispatcher = Dispatcher.find_or_create_by(name: params[:tow][:dispatcher])
    end

    def tow_params
        params.require(:tow).permit(:tow_type, :subtype)
    end
end
