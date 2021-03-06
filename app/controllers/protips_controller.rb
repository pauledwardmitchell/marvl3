class ProtipsController < ApplicationController
  before_action :set_protip, only: [:show, :edit, :update, :destroy]

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
    @protip = Protip.new(protip_params)
    if @protip.save
      render json: @protip
    else
      render json: @protip.errors, status: :unprocessable_entity
    end
  end

  # # PATCH/PUT /posts/1
  # # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @protip.update(protip_params)
        format.html { redirect_to @protip, notice: 'Protip was successfully updated.' }
        format.json { render json: @protip, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @protip.errors, status: :unprocessable_entity }
      end
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
    def set_protip
      @protip = Protip.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def protip_params
      params.require(:protip).permit(:title, :content, :category_id, :user_id)
    end
end
