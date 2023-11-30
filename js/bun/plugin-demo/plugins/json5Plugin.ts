import { plugin } from 'bun';
import JSON5 from 'json5';

plugin({
  name: 'JSON5Loader',
  async setup(build) {
    const { readFileSync } = await import('fs');

    // when a .json5 file is imported...
    build.onLoad({ filter: /\.(json5)$/ }, (args) => {
      // console.log('json5 loader enter');

      // read and parse the file
      const text = readFileSync(args.path, 'utf8');
      const exports = JSON5.parse(text);

      // returns it as a module
      return {
        exports,
        loader: 'object', // we're using "object"—a built-in loader (intended for use by plugins) that converts a plain JavaScript object to an equivalent ES module
      };
    });
  },
});