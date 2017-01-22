# imagecrop
A minimal image cropping plugin

## Installation
1. For Node
```
npm install imagecrop
```
2. For Browser
```
<!--Include jQuery-->
<script src="dist/index.umd.min.js"></script>
```

## Usage
Automatically discover images that needs to be initialized with a cropbox.
```
imagecrop.discover();
```
`x1`, `y1` represents the coordinates left-top vertex of the cropbox. `x2`, `y2` represents the coordinates right-bottom vertex of the cropbox. The coordinates are represented as a percentage of the width/height. On moving or resizing the cropbox, these coordinates are updated in the input fields.
```
<img src="{imageURL}" data-imagecrop="{uniqueid}" data-imagecrop-aspectratio="1" data-imagecrop-precision="6" />
<form>
  <input type="file" data-imagecrop-file="{uniqueid}" />
  <input type="text" data-imagecrop-x1="{uniqueid}" />
  <input type="text" data-imagecrop-y1="{uniqueid}" />
  <input type="text" data-imagecrop-x2="{uniqueid}" />
  <input type="text" data-imagecrop-y2="{uniqueid}" />
</form>
```
