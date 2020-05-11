class ListsController < ApplicationController
  before_action :set_list, only: [:show, :edit, :update, :destroy, :move]

  # GET /lists
  # GET /lists.json
  def index
    @lists = List.sorted
  end

  # GET /lists/1
  # GET /lists/1.json
  def show
  end

  # GET /lists/new
  def new
    @list = List.new
  end

  # GET /lists/1/edit
  def edit
  end

  # POST /lists
  # POST /lists.json
  def create
    @list = List.new(list_params)

    respond_to do |format|
      if @list.save

        # When we create a list, we want action cable server to board cast to the board channel, 
        # passing in commit to a list to matches up with the mutation, 
        # then render to string, with show format json, this will then render to the json jbuilder file where we can then render to vue js

        ActionCable.server.broadcast "board", { commit: 'addList', payload: render_to_string(:show, formats: [:json]) }

        format.html { redirect_to @list, notice: 'List was successfully created.' }
        format.json { render :show, status: :created, location: @list }
      else
        format.html { render :new }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lists/1
  # PATCH/PUT /lists/1.json
  def update
    respond_to do |format|
      if @list.update(list_params)
        format.html { redirect_to @list, notice: 'List was successfully updated.' }
        format.json { render :show, status: :ok, location: @list }
      else
        format.html { render :edit }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lists/1
  # DELETE /lists/1.json
  def destroy
    @list.destroy
    respond_to do |format|
      format.html { redirect_to lists_url, notice: 'List was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def move
    #  use act_as_list methods to insert a new list in a new position, then resolve the rest.
    #  Because the logic to automatically sort all that will be crazy
    @list.insert_at(list_params[:position].to_i)
    render action: :show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      @list = List.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def list_params
      params.require(:list).permit(:name, :position)
    end
end
