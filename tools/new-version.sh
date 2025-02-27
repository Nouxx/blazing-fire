#!/usr/bin/env bash

# Generate Next Semantic Version
# ------------------------------
# return next semantic version based on
# - the current version (ex: 1.2.3)
# - the single commit to compare it with (ex: 'feat!: a breaking change').
#
# Usage: new-version=$(./new-version.sh "1.2.3" 'feat!: a breaking change')

function display_header() {
    # courtesy of https://patorjk.com/software/taag (font: Larry 3D)
    cat <<\EOF >&2
                                                            __                   
      ___      __  __  __  __      __  __    __  _ __  ____/\_\    ___    ___    
    /' _ `\  /'__`/\ \/\ \/\ \    /\ \/\ \ /'__`/\`'__/',__\/\ \  / __`\/' _ `\  
    /\ \/\ \/\  __\ \ \_/ \_/ \   \ \ \_/ /\  __\ \ \/\__, `\ \ \/\ \L\ /\ \/\ \ 
    \ \_\ \_\ \____\ \___x___/'    \ \___/\ \____\ \_\/\____/\ \_\ \____\ \_\ \_\
     \/_/\/_/\/____/\/__//__/       \/__/  \/____/\/_/\/___/  \/_/\/___/ \/_/\/_/

EOF
}

# exit the program with a new version if provided
function exit_with_version() {
    local new_version=$1
    if [[ -n $new_version ]]; then
        echo "New version: '$new_version'" >&2
        echo $new_version
    fi
    echo "Done!" >&2
    exit 0
}

display_header

# parse arguments
tag=$1
commit_name=$2

if [[ -z $tag || -z $commit_name ]]; then
    echo "Usage: $0 <tag> <commit_name>" >&2
    exit 1
fi

echo "Figuring out the next version..." >&2
echo "Provided tag: '$tag'" >&2
echo "Provided commit name: '$commit_name'" >&2

valid_commit_types="build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test"

# exit with error if commit can't be processed
if [[ ! $commit_name =~ ^($valid_commit_types)(!)?(\(.+\))?:\ .+ ]]; then
    echo "the commit message '$commit_name' does not follow the expected conventional commits convention." >&2
    exit 1
fi

commit_type=$(echo $commit_name | grep -oE "^($valid_commit_types)" | head -1)

# exit without version if type should not trigger a release
if [[ $commit_type == "ci" || $commit_type == "docs" || $commit_type == "test" ]]; then
    echo "Commit type '$commit_type' does not trigger a new version." >&2
    exit_with_version
fi

# exit with major bumped version
if [[ $commit_name =~ ! ]]; then
    echo "Commit type '$commit_type' with '!' triggers a major bump." >&2
    new_version=$(echo $tag | awk -F. -v OFS=. '{$1+=1; $2=0; $3=0; print}')
    exit_with_version $new_version
fi

# exit with minor bumped version
if [[ $commit_type == "feat" || $commit_type == "style" || $commit_type == "perf" ]]; then
    echo "Commit type '$commit_type' triggers a minor bump." >&2
    new_version=$(echo $tag | awk -F. -v OFS=. '{$2+=1; $3=0; print}')
    exit_with_version $new_version
fi

# exit with patch bumped version
echo "Commit type '$commit_type' triggers a patch bump." >&2
new_version=$(echo $tag | awk -F. -v OFS=. '{$3+=1; print}')
exit_with_version $new_version
