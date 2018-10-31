class OfferingsController < ApplicationController
  before_action :set_offering, only: [:show, :edit, :update, :destroy]

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
    @offering = Offering.new(offering_params)
    if @offering.save
      render json: @offering
    else
      render json: @offering.errors, status: :unprocessable_entity
    end
  end

  # # PATCH/PUT /posts/1
  # # PATCH/PUT /posts/1.json
  # def update
  #   respond_to do |format|
  #     if @post.update(post_params)
  #       format.html { redirect_to @post, notice: 'Post was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @post }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @post.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

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
    def set_offering
      @offering = Offering.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def offering_params
      params.require(:offering).permit(:vendor_id, :category_id)
    end
end
