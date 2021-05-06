const { fs, path, parseFrontmatter} = require('@vuepress/shared-utils')
const helpers = require('./helpers');

module.exports= function (src) {
  const version = this.resourcePath.split('/docs/').pop().split('/')[0];
  const latest =  helpers.getLatestVersion();
  const basePath = this.rootContext;
  return src.replace(/\((@\/([^)]*\.md))\)/g, (m,full, file) => {
    const fm = parseFrontmatter(fs.readFileSync(path.resolve(basePath, version, file)));
    let permalink = fm.data.permalink?.replace(new RegExp(`^/${latest}/`), '/') || full;
    permalink = permalink.endsWith('/') ? permalink : permalink+'/';
    return `(${permalink})`;
  });
}

