# Blog Repository
Vue3 + vite + ssg + s3 hosting with custom domain

# Setup
## requirement
- aws cli & enough role to manipurate s3 with cloudformation
- your domain & dns

## create stack
replace xxx to your property and run the following command
```
aws cloudformation create-stack \
--profile xxxxx \
--template-body file://cloudformation.yaml \
--stack-name xxxxx \
--parameters ParameterKey=YourDomainName,ParameterValue=XXXXX
```

it is enough for your role to have `AmazonS3FullAccess` & `AWSCloudFormationFullAccess`

expected result is like following
```
{
    "StackId": "arn:aws:cloudformation:yourrigion:XXXXXXXXXX:stack/stackname/yourid"
}
```