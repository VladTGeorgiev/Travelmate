# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_09_183406) do

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string "description"
    t.integer "landmark_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["landmark_id"], name: "index_comments_on_landmark_id"
  end

  create_table "landmarks", force: :cascade do |t|
    t.string "formatted_address"
    t.string "name"
    t.string "photos"
    t.float "longitude"
    t.float "latitude"
    t.float "rating"
    t.integer "user_ratings_total"
    t.integer "city_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "types"
    t.index ["city_id"], name: "index_landmarks_on_city_id"
  end

end
