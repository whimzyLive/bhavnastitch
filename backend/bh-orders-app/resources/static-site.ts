import { Bucket } from '@aws-cdk/aws-s3';
import { Construct, RemovalPolicy } from '@aws-cdk/core';

export interface StaticSiteProps {
  domainName: string;
  siteSubDomain: string;
}

/**
 * Static site infrastructure, which uses an S3 bucket for the content.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 *
 * The ACM certificate is expected to be created and validated outside of the CDK,
 * with the certificate ARN stored in an SSM Parameter.
 */
export class StaticSite extends Construct {
  constructor(parent: Construct, name: string, props: StaticSiteProps) {
    super(parent, name);

    const siteDomain = props.siteSubDomain + '.' + props.domainName;

    // Content bucket
    const siteBucket = new Bucket(this, 'SiteBucket', {
      bucketName: siteDomain,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,

      // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
      // the new bucket, and it will remain in your account until manually deleted. By setting the policy to
      // DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
      removalPolicy: RemovalPolicy.DESTROY // NOT recommended for production code
    });
  }
}
