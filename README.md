oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bzflag-plugin-manager
$ bzpm COMMAND
running command...
$ bzpm (--version)
bzflag-plugin-manager/0.0.0 darwin-x64 node-v18.12.0
$ bzpm --help [COMMAND]
USAGE
  $ bzpm COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bzpm hello PERSON`](#bzpm-hello-person)
* [`bzpm hello world`](#bzpm-hello-world)
* [`bzpm help [COMMAND]`](#bzpm-help-command)
* [`bzpm plugins`](#bzpm-plugins)
* [`bzpm plugins:install PLUGIN...`](#bzpm-pluginsinstall-plugin)
* [`bzpm plugins:inspect PLUGIN...`](#bzpm-pluginsinspect-plugin)
* [`bzpm plugins:install PLUGIN...`](#bzpm-pluginsinstall-plugin-1)
* [`bzpm plugins:link PLUGIN`](#bzpm-pluginslink-plugin)
* [`bzpm plugins:uninstall PLUGIN...`](#bzpm-pluginsuninstall-plugin)
* [`bzpm plugins:uninstall PLUGIN...`](#bzpm-pluginsuninstall-plugin-1)
* [`bzpm plugins:uninstall PLUGIN...`](#bzpm-pluginsuninstall-plugin-2)
* [`bzpm plugins update`](#bzpm-plugins-update)

## `bzpm hello PERSON`

Say hello

```
USAGE
  $ bzpm hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/allejo/bzflag-plugin-manager/blob/v0.0.0/dist/commands/hello/index.ts)_

## `bzpm hello world`

Say hello world

```
USAGE
  $ bzpm hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ bzpm hello world
  hello world! (./src/commands/hello/world.ts)
```

## `bzpm help [COMMAND]`

Display help for bzpm.

```
USAGE
  $ bzpm help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for bzpm.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.20/src/commands/help.ts)_

## `bzpm plugins`

List installed plugins.

```
USAGE
  $ bzpm plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ bzpm plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.9/src/commands/plugins/index.ts)_

## `bzpm plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bzpm plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ bzpm plugins add

EXAMPLES
  $ bzpm plugins:install myplugin 

  $ bzpm plugins:install https://github.com/someuser/someplugin

  $ bzpm plugins:install someuser/someplugin
```

## `bzpm plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ bzpm plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ bzpm plugins:inspect myplugin
```

## `bzpm plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bzpm plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ bzpm plugins add

EXAMPLES
  $ bzpm plugins:install myplugin 

  $ bzpm plugins:install https://github.com/someuser/someplugin

  $ bzpm plugins:install someuser/someplugin
```

## `bzpm plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ bzpm plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ bzpm plugins:link myplugin
```

## `bzpm plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bzpm plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bzpm plugins unlink
  $ bzpm plugins remove
```

## `bzpm plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bzpm plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bzpm plugins unlink
  $ bzpm plugins remove
```

## `bzpm plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bzpm plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bzpm plugins unlink
  $ bzpm plugins remove
```

## `bzpm plugins update`

Update installed plugins.

```
USAGE
  $ bzpm plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
