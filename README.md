# react-screen

A lots of boring carousels? Let's try something else!

![Demo](https://gao-sun.github.io/react-screen/image/demo.gif)

Full documentation @[react-screen](http://gao-sun.github.io/reat-screen).

### Get Started

1.Install react-screen.
```baseh
# Via npm
npm install react-screen

# Via Bower
bower install react-screen
```

2.Import react & react-screen.
```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Screen, ScreenSlice } from 'react-screen';
```

3.Import stylesheet.
```javascript
// In jsx
import styles from 'node_modules/react-screen/dist/css/react-screen.css';
```

Or
```html
<!-- In HTML -->
<link rel="stylesheet" href="path/to/css/react-screen.css">
```

4.Render it!
```javascript
ReactDOM.render((
    <Screen>
        <ScreenSlice>
            <h1>First Screen</h1>
        </ScreenSlice>
        <ScreenSlice>
            <h1>Second Screen</h1>
        </ScreenSlice>
        <ScreenSlice>
            <h1>Third Screen</h1>
        </ScreenSlice>
    </Screen>
), document.getElementById('react-screen'));
```