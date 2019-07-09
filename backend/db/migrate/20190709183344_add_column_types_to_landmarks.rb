class AddColumnTypesToLandmarks < ActiveRecord::Migration[5.2]
  def change
    add_column :landmarks, :types, :string
  end
end
