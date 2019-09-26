args=("$@")

bazel build //...
rm -rf $(pwd)/dist/bin/${args[0]}/latest/
unzip $(pwd)/dist/bin/${args[0]}/latest.zip -d $(pwd)/dist/bin/${args[0]}/latest
find $(pwd)/dist/bin/${args[0]}/latest/ -type f  -exec touch {} +
cd $(pwd)/dist/bin/${args[0]}/latest
sam package --template-file template.yml --output-template-file package.yml --s3-bucket test-bucket-istark --profile ${args[1]}
sam deploy --template-file package.yml --stack-name ${args[0]} --s3-bucket test-bucket-istark --capabilities CAPABILITY_IAM  --profile ${args[1]}   
