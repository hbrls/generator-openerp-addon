'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('addon_name', { type: String, required: true });
    this.addon_short = this.addon_name.replace(/^nt_/, '');

    this.addon_depends = '';

    this.timestamp = Math.floor(Date.now() / 1000);
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('OpenERP Addon') + ' generator!'
    ));
    this.log(chalk.yellow('!!!有些基础代码和文件，可能项目经理已经帮你建好了，注意不要覆盖'));


    var prompts = [];

    prompts.push({
      name: 'addon_name',
      message: 'Addon 名称',
      default: this.addon_name
    });

    prompts.push({
      type: 'confirm',
      name: 'is_website',
      message: '是一个 Web Site？',
      default: false
    });

    prompts.push({
      type: 'confirm',
      name: 'npm_install',
      message: '是否执行 `npm install`？',
      default: false
    });

    this.prompt(prompts, function (props) {
      this.addon_name = props.addon_name;

      this.is_website = props.is_website;
      if (this.is_website) {
        this.addon_depends += ", 'nt_site'";
        this.static_dir = 'web';
      } else {
        this.static_dir = 'static';
      }

      this.npm_install = props.npm_install;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('__init__.py'),
        this.destinationPath('__init__.py')
      );

      this.fs.copyTpl(
        this.templatePath('__openerp__.py'),
        this.destinationPath('__openerp__.py'),
        this
      );
    },

    frontend: function () {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        this
      );
    },

    oeca: function () {
      if (!this.is_website) {
        this.fs.copyTpl(
          this.templatePath('menu.xml'),
          this.destinationPath('menu.xml'),
          this
        );

        this.fs.copyTpl(
          this.templatePath('static/xml/**'),
          this.destinationPath('static/xml'),
          this
        );

        this.fs.copyTpl(
          this.templatePath('src/**'),
          this.destinationPath('static/src'),
          this
        );

        this.fs.copyTpl(
          this.templatePath('sass/example/**'),
          this.destinationPath('static/sass/example'),
          this
        );
      }
    },

    website: function () {
      if (this.is_website) {
        this.fs.copyTpl(
          this.templatePath('data_noupdate.xml'),
          this.destinationPath('data_noupdate.xml'),
          this
        );

        this.fs.copyTpl(
          this.templatePath('apps/**'),
          this.destinationPath('apps'),
          this
        );

        this.fs.copyTpl(
          this.templatePath('sass/example/**'),
          this.destinationPath('web/sass/example'),
          this
        );

        this.fs.copyTpl(
          this.templatePath('src/**'),
          this.destinationPath('web/src'),
          this
        );

        // 由于 Mako 和 _.template 之间的冲突，没有用模板，需要自己改
        // REPLACE_ADDON_NAME
        // REPLACE_ADDON_SHORT
        this.fs.copy(
          this.templatePath('web/*.html'),
          this.destinationPath('web'),
          this
        );
      }
    }
  },

  install: function () {
    if (this.npm_install) {
      this.installDependencies({
        npm: this.npm_install,
        bower: false
      });
    }
  },

  end: function () {
    this.spawnCommand('gulp', ['init']);

    this.log(chalk.red('你要注意以下几件事情：'));
    this.log('1. blahblah');
  }
});
