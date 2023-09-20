# Software Requirements Specification

## 1. Introduction

### 1.1 Terminology
| Term | Definition |
| :--: | :--: |
| Pomodoro technique | time management method that allocates time for working, and for resting |
| Poom | name of this application |
| Worker | a user of the application |
| Session | a set of data for one instance of a **timer** | 
| Timer | a pomodoro timer that alternates between work and rest countdowns. |
| View | a visual interface of the application |

### 1.2 Purpose
This document describes the functional and nonfunctional requirements for initial release 1.0 of the
Pomodoro timer for Discord, poom. It is intended to be used by anyone who will implement and/or verify the correct functioning of the system. Unless otherwise noted, all requirements specified here are committed for the initial release.

### 1.3 Document Conventions
The document follows a markdown header conventions, where each header and sub-header must use appropriate number of _#_ symbols to denote a header or one of it's sub-headers.

### 1.4 Project Scope
Poom will allow users of the application to start, stop or finish, and pause a pomodoro session. The ability to join other user' session will most likely have to be implemented after the initial release, due to insufficient time/developer resources.

### 1.4 References
1. [Discord.js Guide](https://discordjs.guide/#before-you-begin)
2. [Discord.js Documentation](https://old.discordjs.dev/#/docs/discord.js/14.13.0/general/welcome)

## 2. Overall Description

### 2.1 Product Perspective
 
