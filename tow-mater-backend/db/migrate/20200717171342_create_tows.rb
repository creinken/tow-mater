class CreateTows < ActiveRecord::Migration[6.0]
  def change
    create_table :tows do |t|
        t.string :type,             null: false, default: "cash call"
        t.string :subtype,          null: false, default: "tow"
        t.integer :driver_id
        t.integer :dispatcher_id
        t.string :location_at
        t.string :location_to

        t.timestamps
    end
  end
end
