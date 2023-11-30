import { plugin } from 'bun';

plugin({
  name: 'YAMLLoader',
  async setup(build) {
    const { load } = await import('js-yaml');
    const { readFileSync } = await import('fs');

    // when a .yaml file is imported...
    build.onLoad({ filter: /\.(yaml|yml)$/ }, (args) => {
      console.log('yaml loader enter');

      const text = readFileSync(args.path, 'utf8');
      const exports = load(text) as Record<string, any>;

      console.log(exports);
      // and returns it as a module
      return {
        exports,
        loader: "object", // special loader for JS objects
      };
    });
  },
});