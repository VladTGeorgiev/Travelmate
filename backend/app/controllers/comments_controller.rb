class CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: CommentSerializer.new(comments).to_serialized_json
    end

    def show
        comment = Comment.find_by(id: params[:id])
        if comment 
            render json: CommentSerializer.new(comment).to_serialized_json
        else
            render plain: "This comment doesn't exist"
        end
    end

    def create
        city = City.find_by(id: params[:city])
        comment = Comment.create(city)
        render json: comment, only: [:id, :city_id]
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.destroy
    end

end
