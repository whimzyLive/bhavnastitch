import { Stack, App, StackProps } from '@aws-cdk/core';
import { StaticSite } from './resources/static-site';

class MyStaticSiteStack extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);

    new StaticSite(this, 'StaticSite', {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: this.node.tryGetContext('subdomain')
    });
  }
}

const app = new App();

new MyStaticSiteStack(app, 'MyStaticSite', { env: { region: 'us-east-1' } });
