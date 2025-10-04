const fs = require('fs');
const path = require('path');

const packagesDir = path.resolve(__dirname, '../packages');
const manifestPath = path.resolve(__dirname, '../plugins-manifest.json');

const plugins = [];

fs.readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const packagePath = path.join(packagesDir, dirent.name);
    const packageJsonPath = path.join(packagePath, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      // Filtra solo los paquetes que son plugins de cypress-craft
      if (packageJson.name && packageJson.name.startsWith('@cypress-craft/plugin-')) {
        plugins.push({
          name: packageJson.name,
          description: packageJson.description || '',
          version: packageJson.version
        });
      }
    }
  });

fs.writeFileSync(manifestPath, JSON.stringify({ plugins }, null, 2), 'utf8');
console.log('plugins-manifest.json generado exitosamente.');