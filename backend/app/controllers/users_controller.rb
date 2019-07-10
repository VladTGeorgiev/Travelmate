class UsersController < ApplicationController
    def index
        users = User.all
        render json: UserSerializer.new(users).to_serialized_json
    end

    def show
        user = User.find_by(id: params[:id])
        if user 
            render json: UserSerializer.new(user).to_serialized_json
        else
            render plain: "This user doesn't exist"
        end
    end

    def create
        user = User.create(attr)
        render json: user, only: [:username]
    end

    private

    def attr
        params.require(:user).permit(:username)
    end
end
