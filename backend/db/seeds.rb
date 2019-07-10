# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json'

file = File.read('data.json')
data_hash = JSON.parse(file)

data_hash.each do |everything|
    everything[1].each do |city|
            City.create(
                name: city['name']
            )
    end
end

data_hash.each do |everything|
    everything[1].each do |city|
        city['landmarks'].each do |landmark|
            Landmark.create(            
            city_id: city['id'],
            formatted_address: landmark['formatted_address'],
            longitude: landmark['geometry']['location']['lng'],
            latitude: landmark['geometry']['location']['lat'],
            name: landmark['name'],
            # photos: landmark['photos'][0]['html_attributions'][0],
            rating: landmark['rating'],
            types: landmark['types'],
            user_ratings_total: landmark['user_ratings_total']
            )
        end
    end
end

users = [
    {username: "Vlad"},
    {username: "Toby"},
    {username: "Maija"},
    {username: "Aaron"}
]
  
users.each {|user| User.create(user)}

comments = [
    {description: "Comment One", landmark_id: 1, user_id: 1 },
    {description: "Comment Two", landmark_id: 2, user_id: 2 },
    {description: "Comment Three", landmark_id: 1, user_id: 3 },
    {description: "Comment Four", landmark_id: 3, user_id: 4 }
  ]
  
  comments.each {|comment| Comment.create(comment)}
