PostImage.find_or_create_by!(shop_name: "Cavello") do |post_image|
  post_image.image = ActiveStorage::Blob.create_and_upload!(io: File.open("#{Rails.root}/db/fixtures/sample-post1.jpg"), filename:"sample-post1.jpg")
  post_image.caption = "大人気のカフェです。"
  post_image.address = "大阪府大阪市北区梅田１丁目" 
  post_image.user.name = 'olivia'
end

PostImage.find_or_create_by!(shop_name: "じゆうきままに") do |post_image|
  post_image.image = ActiveStorage::Blob.create_and_upload!(io: File.open("#{Rails.root}/db/fixtures/sample-post2.jpg"), filename:"sample-post2.jpg")
  post_image.caption = "小泉花陽推しです"
  post_image.address = "大阪府大阪市中央区心斎橋筋２丁目2-10　新日本三ツ寺ビル" 
  post_image.user.name = 'tatsuji'
end

PostImage.find_or_create_by!(shop_name: "ShoreditchBar") do |post_image|
  post_image.image = ActiveStorage::Blob.create_and_upload!(io: File.open("#{Rails.root}/db/fixtures/sample-post3.jpg"), filename:"sample-post3.jpg")
  post_image.caption = 'メキシコ料理好きな方にオススメ！'
  post_image.address = "大阪府大阪市淀川区西中島5-16-1" 
  post_image.user.name = 'lucas'
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
