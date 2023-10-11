<p align="center">
  <img src="./media/exported/poom_banner.png"/>
</p>

<div align="center">

<a href="#">![LastCommit](https://img.shields.io/github/last-commit/asror1/poom-bot/master?style=flat-square&color=c09473)</a>

</div>

<hr>

_Poom_ bot is your number one helper when it comes to employing the pomodoro technique right within Discord! The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, typically 25 minutes in length, separated 5 minute rest period.

### Try it out

1. [Add poom to your server](https://discord.com/api/oauth2/authorize?client_id=897874777828626492&permissions=58268180610368&scope=bot)
2. Start a pomodoro session using `/start`

### Commands Overview

|   command   | description                             |
| :---------: | :-------------------------------------- |
|  `/start`   | start a pomodoro session                |
| `/feedback` | provide your feedback to improve _poom_ |

### Start Command

Any parameter that does not have a default value is required.

| parameter | accepted value | default value | description |
| :---: | :---: | :---: | :---: |
| `work` | a number between 1 and 60 | 25 | desired _work_ interval in minutes |
| `rest` | a number between 1 and 60 | 5 | desired _rest_ interval in minutes |
| `rest_first` | True or False | False | whether to start pomodoro session with a rest timer |

**Examples**

- Full `/start work:30 rest:10 rest_first:True` <br>
- Minimal `/start`

### Coming Soon

- Join other people's sessions
- Rewards

### Contributing

Any contribution to the project is welcome! If you are a software developer, an illustrator, or a copy writer, please feel free to contribute by opening up a pull request or a new issue. New or improved art would be amazing, so is improved code/functionality or textual content.
