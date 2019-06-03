class PointPeopleController < ApplicationController
  before_action :set_point_person, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
  end

  # # GET /posts/1
  # # GET /posts/1.json
  # def show
  # end

  # # GET /posts/new
  # def new
  #   @post = Post.new
  # end

  # # GET /posts/1/edit
  # def edit
  # end

  # POST /posts
  # POST /posts.json
  def create
    @point_person = PointPerson.new(point_person_params)
    if @point_person.save
      render json: @point_person
    else
      render json: @point_person.errors, status: :unprocessable_entity
    end
  end

  def update
    if @point_person.update(point_person_params)
      render json: @point_person
    else
      render json: @point_person.errors, status: :unprocessable_entity
    end
  end

  # # DELETE /posts/1
  # # DELETE /posts/1.json
  # def destroy
  #   @post.destroy
  #   respond_to do |format|
  #     format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  # def all_posts
  #   @posts = Post.all
  #   render json: @posts
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_point_person
      @point_person = PointPerson.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def point_person_params
      params.require(:point_person).permit(:vendor_id, :name, :email, :phone, :title)
    end
end
