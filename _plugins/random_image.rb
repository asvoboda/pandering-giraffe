module Jekyll
  class RandomImage < Liquid::Tag
    @path = nil

    @class = nil
    @wrap_class = nil
    @wrap_tag = nil

    def initialize(tag_name, text, tokens)
      super

      # The path we're getting images from (a dir inside your jekyll dir)
      @path = text.split(/\s+/)[0].strip

      # Defaults
      @class = 'image'
      @wrap_class = 'image-item'
      @wrap_tag = 'div'

      # Parse Options
      if text =~ /--class=(\S+)/i
        @class = text.match(/--class=(\S+)/i)[1]
      end
      if text =~ /--wrap-class=(\S+)/i
        @wrap_class = text.match(/--wrap-class=(\S+)/i)[1]
      end
      if text =~ /--wrap-tag=(\S+)/i
        @wrap_tag = text.match(/--wrap-tag=(\S+)/i)[1]
      end

    end

    def render(context)
      # Get the full path to the dir
      # Include a filter for JPG and PNG images
      full_path = File.join(context.registers[:site].config['source'], @path, "*.{jpg,jpeg,JPG,JPEG,png,PNG}")
      # Start building tags
      # Glob the path and create tags for all images
      image = Dir.glob(full_path).shuffle.sample
      file = Pathname.new(image).basename
      src = File.join('/', @path, file)
      source = "<#{@wrap_tag} class='#{@wrap_class}' style=\"background-image: url('#{src}');\">\n"
      source += "</#{@wrap_tag}>\n"
      source
    end
  end
end

Liquid::Template.register_tag('random_image', Jekyll::RandomImage)
