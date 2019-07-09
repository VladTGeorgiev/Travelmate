class LandmarkSerializer
 
    def initialize(landmark_object)
      @landmark = landmark_object
    end

    def to_serialized_json
        @landmark.to_json(:include => {
        :comments => {:only => [:id, :description]},
      }, :except => [:created_at, :updated_at])
    end
    
end