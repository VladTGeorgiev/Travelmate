class LandmarksController < ApplicationController
    def index
        landmarks = Landmark.all
        if landmarks 
            render json: LandmarkSerializer.new(landmarks).to_serialized_json
        else
            render plain: "Currently there are no landmarks"
        end
    end
    def show
        landmark = Landmark.find_by(id: params[:id])
        if landmark 
            render json: LandmarkSerializer.new(landmark).to_serialized_json
        else
            render plain: "There is no landmark with this name"
        end
    end
end
