PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home/bin
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

# Added by Amplify CLI binary installer
export PATH="$HOME/.amplify/bin:$PATH"
export PATH="/opt/homebrew/opt/php@8.0/bin:$PATH"
export PATH="/opt/homebrew/opt/php@8.0/bin:$PATH"
export PATH="/opt/homebrew/opt/php@8.0/sbin:$PATH"
eval "$(~/.rbenv/bin/rbenv init - zsh)"
export PATH="/usr/local/opt/ruby/bin:$PATH"
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH
export GRAPHVIZ_DOT="$(brew --prefix)/bin/dot"
export PATH=$GRAPHVIZ_DOT:$PATH
export PATH="/usr/local/opt/mysql-client/bin:$PATH"
eval "$(/opt/homebrew/bin/brew shellenv)"
export PATH="/opt/homebrew/bin:$PATH"
alias sail="./vendor/bin/sail"
