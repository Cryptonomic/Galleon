require('dotenv').config();

const { notarize } = require('@electron/notarize');

console.log("running NOTARIZE SCRIPT")

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  console.log('APP_ID',process.env.APPLEID)
  console.log('APP_PASS',process.env.APPLEIDPASS)

  return await notarize({
    appBundleId: 'tech.cryptonomic.galleon',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
    teamId: 'G7QQMG8Q65',
  });
};
