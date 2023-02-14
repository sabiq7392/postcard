import yaml from 'js-yaml';
import fs from 'fs';

export interface Config {
  google_maps: {
    api_key: string
  },
  api: {
    base_url: string,
  }
}

const config = yaml.load(fs.readFileSync('config.yml', 'utf8')) as unknown as Config;

export default config;