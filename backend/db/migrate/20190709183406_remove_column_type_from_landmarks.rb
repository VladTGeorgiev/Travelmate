class RemoveColumnTypeFromLandmarks < ActiveRecord::Migration[5.2]
  def change
    remove_column :landmarks, :type, :string
  end
end
