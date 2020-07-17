# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

chris = Driver.create(name: "Chris", email: "chris@tow.com")
rob = Driver.create(name: "Rob", email: "rob@tow.com")
chad = Driver.create(name: "Chad", email: "chad@tow.com")
heath = Driver.create(name: "Heath", email: "heath@tow.com")

jo = Dispatcher.create(name: "Jo", email: "jo@tow.com")
amanda = Dispatcher.create(name: "Amanda", email: "amanda@tow.com")
linda = Dispatcher.create(name: "Linda", email: "linda@tow.com")

Tow.create(driver: chris, dispatcher: jo)
Tow.create(driver: chad, dispatcher: jo)
Tow.create(driver: rob, dispatcher: amanda, tow_type: "LPD")
