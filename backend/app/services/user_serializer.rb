class UserSerializer
 
    def initialize(user_object)
      @user = user_object
    end

    def to_serialized_json
        @user.to_json(:include => {
        :comments => {:only => [:id, :description, :user_id]},
      }, :except => [:created_at, :updated_at])
    end
    
end