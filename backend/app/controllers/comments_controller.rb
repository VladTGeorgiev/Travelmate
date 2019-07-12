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
        comment = Comment.create(attr)
        render json: comment, only: [:description, :user_id, :landmark_id, :id, :username]
    end

    def update
        comment = Comment.find(params[:id])
        comment.update(attr)
        render json: CommentSerializer.new(comment).to_serialized_json
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        id = comment.id
        comment.destroy
        render json: {info: 'Comment destroyed', commentId: id}
    end

    private

    def attr
        params.require(:comment).permit(:landmark_id, :description, :user_id, :username)
    end

end
