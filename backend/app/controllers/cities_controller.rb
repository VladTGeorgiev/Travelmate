class CitiesController < ApplicationController

    def index
        cities = City.all
        render json: CitySerializer.new(cities).to_serialized_json
    end

    def show
        city = City.find_by(id: params[:id])
        if city 
            render json: CitySerializer.new(city).to_serialized_json
        else
            render plain: "There is no city with this name"
        end
    end

end
