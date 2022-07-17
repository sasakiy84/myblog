# Blog Repository
Vue3 + vite + ssg + s3 hosting with custom domain

# Setup
## requirement
- aws cli & enough role to manipurate s3 with cloudformation
- your domain & dns

## create stack
Replace xxx to your property and run the following command.
```bash
aws cloudformation create-stack \
--profile xxxxx \
--template-body file://cloudformation.yaml \
--stack-name xxxxx \
--parameters ParameterKey=YourDomainName,ParameterValue=XXXXX
```

It's enough for your role to have `AmazonS3FullAccess` & `AWSCloudFormationFullAccess`.

Expected result is like following.
```
{
    "StackId": "arn:aws:cloudformation:yourrigion:XXXXXXXXXX:stack/stackname/yourid"
}
```

## configure your DNS
Run following command and find bucket's WebsiteURL domain in `Outputs`.
```bash
aws cloudformation describe-stacks \
--profile xxxxx \
--stack-name xxxxx
```

And set your DNS record `CNAME` (or `ALIAS`) to the domain on your DNS console.

## configure your Github Repository
Set following github secret
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

## deploy your articles
Edit your posts in `/articles` folder and push them to `master` branch, and github actions deploy all generated files to the s3 bucket.