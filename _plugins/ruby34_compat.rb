# _plugins/ruby34_compat.rb
# Alias per compatibilità con Ruby >= 3.4
class File
  class << self
    alias_method :exists?, :exist? unless respond_to?(:exists?)
  end
end
