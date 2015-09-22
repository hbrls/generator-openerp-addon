var _ = require('lodash');
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

    this.static_dir = 'static';

    this.timestamp = Math.floor(Date.now() / 1000);
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('OpenERP Addon') + ' generator for a ' + chalk.red('Client Action/Widget') + '!'
    ));
    this.log(chalk.yellow('!!!本 yo 只输出示例文件，请自行参考并修改'));


    var prompts = [];

    prompts.push({
      name: 'addon_name',
      message: 'Addon 名称',
      default: this.addon_name
    });

    prompts.push({
      name: 'widget_name',
      message: 'Widget 名称（snake_case）',
    });

    this.prompt(prompts, function (props) {
      this.addon_name = props.addon_name;
      this.widget_name = props.widget_name;
      this.widget_obj = _.capitalize(_.camelCase(props.widget_name));
      this.widget_class = _.kebabCase(props.widget_name);

      done();
    }.bind(this));
  },

  writing: {
    main: function () {
      this.fs.copyTpl(
        this.templatePath('menu.yo.xml'),
        this.destinationPath('menu.yo.xml'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('static/src/index.yo.js'),
        this.destinationPath('static/src/index.yo.js'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('static/xml/widget.yo.xml'),
        this.destinationPath('static/xml/' + this.widget_name + '_widget.yo.xml'),
        this
      );
    },
  },
});
