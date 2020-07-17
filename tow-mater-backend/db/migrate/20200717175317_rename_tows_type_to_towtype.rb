class RenameTowsTypeToTowtype < ActiveRecord::Migration[6.0]
  def change
      rename_column :tows, :type, :tow_type
  end
end
