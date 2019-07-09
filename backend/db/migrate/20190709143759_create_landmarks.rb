class CreateLandmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :landmarks do |t|
      t.string :formatted_address
      t.string :name
      t.string :photos
      t.float :longitude
      t.float :latitude
      t.float :rating
      t.string :type
      t.integer :user_ratings_total
      t.references :city, foreign_key: true

      t.timestamps
    end
  end
end
