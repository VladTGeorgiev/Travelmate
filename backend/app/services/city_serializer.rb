class CitySerializer
 
    def initialize(city_object)
      @city = city_object
    end

    def to_serialized_json
        @city.to_json(:include => {
        :landmarks => {:only => [:id, :formatted_address, :name, :photos, :longitude, :latitude, :rating, :type, :user_ratings_total,  :city_id]}, :comments => {:only => [:id, :description, :landmark_id]}}, :except => [:created_at, :updated_at])
    end
    
end