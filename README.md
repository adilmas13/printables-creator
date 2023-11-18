# Printables Creator
Seemlessly convert multiple designs to different sizes in pixels and also create mockups for the same designs.

## Why was this project created?
This all started after seeing the tedious and repetative process that goes into creating a design and its mockup. The process typically includes the followig steps
1. Creating your design in the highest dimension.
2. Resizing the design to various sizes(around 5 sizes)
3. Manually creating multiple mockups to show the a visual representation of the design and also add any static design on it, if needed.
4. Copy any static image that we want to show besides our mockup
Step 1 is the only place where creativity comes in.
However, steps 2, 3, 4 are too repetitive and super time consuming.
Now imagine doing this for multiple designs.

## The process
1. The process takes in a pdf file with all your designs on a seperate page
2. The app iterates through the pdf, fetches each page, creates multiple versions of the same design and also generates multiple mockups for each design
3. All the designs are placed in a "output" folder with sub folders created within it for each design(resized versions + mockups)
4. Additionally few static designs that will be common across all designs is also copied in the mockup folders of the designs 

### Build
```
npm run build
```

### Start generation
```
npm run start <path-to-pdf-file.pdf>
```


