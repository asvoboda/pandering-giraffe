# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.synced_folder ".", "/home/vagrant/pandering-giraffe"
  config.vm.network "forwarded_port", guest: 4000, host: 4000
  config.vm.provision :shell,
    :inline => "sudo apt-get update && sudo apt-get -y install build-essential git ruby1.9.3 ruby1.9.3-dev && sudo gem install jekyll && sudo gem install therubyracer"
  config.ssh.forward_agent = true
end
