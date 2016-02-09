# Enki
A Podcast Social Recommendation Engine

## Table of Contents

1. [Team](#authors)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Authors:

| Name        | Github           | LinkedIn  |
| ------------- |:-------------:| -----:|
| **Ajoke Salaudeen**      | https://github.com/joksina | https://www.linkedin.com/in/jksalaudeen |
| **Tessa Serdar**      | https://github.com/tessajeanserdar      | https://www.linkedin.com/in/tessa-serdar-5a977b18 |
| **Joey Leung** | https://github.com/DzoYee      |   https://www.linkedin.com/in/joeydleung  |
| **Joshua Huang** | https://github.com/jphuangjr     |   https://www.linkedin.com/in/jphuangjr  |

## Usage

1. Create an account
2. Search for Podcast Using ElasticSearch
3. Choose one and listen to it
4. Click next for recommendation based on what you like

## Requirements

- Node
- Neo4j
- ElasticSearch
- Ionic
- Xcode

## Development

### Installing Dependencies

From the folder directory:

```sh
npm install
```
##### To run the Server

- CD into server and run ``` node server.js```

##### To run the mobile version on Xcode

- CD into the mobile directory
- Run ``` ionic platform ios```
- ``` ionic build ios```
- ```ionic emulate ios```
- On the same directory, Run ``` ionic server --lab``` to run on Web

##### To run ElasticSearch

- CD into server
- Run ``` node loadPodcastsElastic.js```
- And run elasticsearch

## Roadmap

## Contributing
